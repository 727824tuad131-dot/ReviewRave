package com.example.demo.service;

import com.example.demo.entity.CustomerReview;
import com.example.demo.entity.PlatformUser;
import com.example.demo.entity.ResolutionTicket;
import com.example.demo.entity.SentimentInsight;
import com.example.demo.repository.CustomerReviewRepository;
import com.example.demo.repository.PlatformUserRepository;
import com.example.demo.repository.ResolutionTicketRepository;
import com.example.demo.repository.SentimentInsightRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dto.ResolutionDto;
import com.example.demo.event.TicketResolvedEvent;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.exception.BusinessValidationException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TicketResolutionService {

    private final ResolutionTicketRepository ticketRepository;
    private final SentimentInsightRepository insightRepository;
    private final PlatformUserRepository userRepository;
    private final CustomerReviewRepository reviewRepository;
    private final ApplicationEventPublisher eventPublisher;

    @Transactional
    public ResolutionTicket createManualTicket(Long insightId) {
        SentimentInsight insight = insightRepository.findById(insightId)
                .orElseThrow(() -> new ResourceNotFoundException("SentimentInsight not found with ID: " + insightId));

        // Ensure ticket doesn't already exist for this metric insight
        if (ticketRepository.findByInsightId(insightId).isPresent()) {
            throw new BusinessValidationException("A ticket already exists linked to this specific dynamic snapshot insight.");
        }

        ResolutionTicket ticket = ResolutionTicket.builder()
                .priority(ResolutionTicket.TicketPriority.MEDIUM)
                .ticketStatus(ResolutionTicket.TicketStatus.OPEN)
                .insight(insight)
                .build();

        return ticketRepository.save(ticket);
    }

    @Transactional
    public void assignTicket(Long ticketId, Long agentId) {
        ResolutionTicket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket not found with ID: " + ticketId));

        PlatformUser agent = userRepository.findById(agentId)
                .orElseThrow(() -> new ResourceNotFoundException("Target agent profile allocation not found with ID: " + agentId));

        // Enforce max 3 unresolved active assignments workload limit constraint
        List<ResolutionTicket> activeTickets = ticketRepository
                .findByAssigneeIdAndTicketStatusNot(agentId, ResolutionTicket.TicketStatus.RESOLVED);

        if (activeTickets.size() >= 3) {
            throw new BusinessValidationException("Maximum of 3 pending tickets allowed.");
        }

        ticket.setAssignee(agent);
        ticket.setTicketStatus(ResolutionTicket.TicketStatus.INVESTIGATING);
        ticketRepository.save(ticket);
    }

    @Transactional(rollbackFor = BusinessValidationException.class)
    public void resolveTicket(Long ticketId, Long agentId, ResolutionDto dto) {
        ResolutionTicket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket not found with ID: " + ticketId));

        if (ticket.getAssignee() == null || !ticket.getAssignee().getId().equals(agentId)) {
            throw new BusinessValidationException("Only the designated assignee layout manager can process resolution tasks.");
        }

        ticket.setResolutionNotes(dto.getResolutionNotes());
        ticket.setTicketStatus(ResolutionTicket.TicketStatus.RESOLVED);
        ticketRepository.save(ticket);

        // Update parent entity status lifecycle back down stream 
        CustomerReview review = ticket.getInsight().getReview();
        review.setProcessingStatus(CustomerReview.ProcessingStatus.ANALYZED);
        reviewRepository.save(review);

        // Publish termination sync hook message context payload 
        eventPublisher.publishEvent(new TicketResolvedEvent(ticketId));
    }

    @Transactional(readOnly = true)
    public List<ResolutionTicket> getAgentTickets(Long agentId) {
        return ticketRepository.findByAssigneeId(agentId);
    }

    @Transactional(readOnly = true)
    public List<ResolutionTicket> getAllOpenTickets() {
        return ticketRepository.findByTicketStatus(ResolutionTicket.TicketStatus.OPEN);
    }
}