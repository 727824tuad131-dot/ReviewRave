
package com.example.demo.service;

import com.example.demo.dto.ResolutionDto;
import com.example.demo.dto.TicketResponseDto;
import com.example.demo.entity.PlatformUser;
import com.example.demo.entity.ResolutionTicket;
import com.example.demo.exception.BusinessValidationException;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.exception.TicketLimitExceededException;
import com.example.demo.repository.ResolutionTicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TicketService {

    private static final int MAX_CONCURRENT_TICKETS = 3;

    private final ResolutionTicketRepository ticketRepository;

    public List<TicketResponseDto> getTicketsByAgent(Long agentId) {
        return ticketRepository.findByAgentId(agentId).stream()
                .map(this::toResponseDto)
                .collect(Collectors.toList());
    }

    public List<TicketResponseDto> getAllTickets() {
        return ticketRepository.findAll().stream()
                .map(this::toResponseDto)
                .collect(Collectors.toList());
    }

    public TicketResponseDto getTicketById(Long id) {
        ResolutionTicket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket not found with id: " + id));
        return toResponseDto(ticket);
    }

    @Transactional
    public TicketResponseDto assignTicket(Long ticketId, PlatformUser agent) {
        ResolutionTicket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket not found with id: " + ticketId));

        if (ticket.getStatus() != ResolutionTicket.Status.PENDING) {
            throw new BusinessValidationException("Only PENDING tickets can be assigned");
        }

        long activeTickets = ticketRepository.countByAgentIdAndStatus(
                agent.getId(), ResolutionTicket.Status.IN_PROGRESS);

        if (activeTickets >= MAX_CONCURRENT_TICKETS) {
            throw new TicketLimitExceededException();
        }

        ticket.setAgent(agent);
        ticket.setStatus(ResolutionTicket.Status.IN_PROGRESS);

        ResolutionTicket updated = ticketRepository.save(ticket);
        return toResponseDto(updated);
    }

    @Transactional
    public TicketResponseDto resolveTicket(Long ticketId, ResolutionDto dto, PlatformUser agent) {
        ResolutionTicket ticket = ticketRepository.findById(ticketId)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket not found with id: " + ticketId));

        if (ticket.getStatus() != ResolutionTicket.Status.IN_PROGRESS) {
            throw new BusinessValidationException("Only IN_PROGRESS tickets can be resolved");
        }

        if (ticket.getAgent() == null || !ticket.getAgent().getId().equals(agent.getId())) {
            throw new BusinessValidationException("Ticket is not assigned to this agent");
        }

        ticket.setResolutionNotes(dto.getNotes());
        ticket.setStatus(ResolutionTicket.Status.RESOLVED);

        ResolutionTicket updated = ticketRepository.save(ticket);
        return toResponseDto(updated);
    }

    private TicketResponseDto toResponseDto(ResolutionTicket ticket) {
        return TicketResponseDto.builder()
                .id(ticket.getId())
                .reviewId(ticket.getReview() != null ? ticket.getReview().getId() : null)
                .reviewContent(ticket.getReview() != null ? ticket.getReview().getContent() : null)
                .productId(ticket.getReview() != null && ticket.getReview().getProduct() != null
                        ? ticket.getReview().getProduct().getId() : null)
                .productName(ticket.getReview() != null && ticket.getReview().getProduct() != null
                        ? ticket.getReview().getProduct().getName() : null)
                .agentId(ticket.getAgent() != null ? ticket.getAgent().getId() : null)
                .agentEmail(ticket.getAgent() != null ? ticket.getAgent().getEmail() : null)
                .status(ticket.getStatus())
                .resolutionNotes(ticket.getResolutionNotes())
                .build();
    }
}