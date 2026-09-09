// package com.example.demo.service;

// import com.example.demo.entity.CustomerReview;
// import com.example.demo.entity.PlatformUser;
// import com.example.demo.entity.ResolutionTicket;
// import com.example.demo.entity.SentimentInsight;
// import com.example.demo.repository.CustomerReviewRepository;
// import com.example.demo.repository.PlatformUserRepository;
// import com.example.demo.repository.ResolutionTicketRepository;
// import com.example.demo.repository.SentimentInsightRepository;
// import lombok.RequiredArgsConstructor;
// import org.springframework.context.ApplicationEventPublisher;
// import org.springframework.stereotype.Service;
// import org.springframework.transaction.annotation.Transactional;

// import com.example.demo.dto.ResolutionDto;
// import com.example.demo.event.TicketResolvedEvent;
// import com.example.demo.exception.ResourceNotFoundException;
// import com.example.demo.exception.BusinessValidationException;

// import java.util.List;

// @Service
// @RequiredArgsConstructor
// public class TicketResolutionService {

//     private final ResolutionTicketRepository ticketRepository;
//     private final SentimentInsightRepository insightRepository;
//     private final PlatformUserRepository userRepository;
//     private final CustomerReviewRepository reviewRepository;
//     private final ApplicationEventPublisher eventPublisher;

//     @Transactional
//     public ResolutionTicket createManualTicket(Long insightId) {
//         SentimentInsight insight = insightRepository.findById(insightId)
//                 .orElseThrow(() -> new ResourceNotFoundException("SentimentInsight not found with ID: " + insightId));

//         // Ensure ticket doesn't already exist for this metric insight
//         if (ticketRepository.findByInsightId(insightId).isPresent()) {
//             throw new BusinessValidationException("A ticket already exists linked to this specific dynamic snapshot insight.");
//         }

//         ResolutionTicket ticket = ResolutionTicket.builder()
//                 .priority(ResolutionTicket.TicketPriority.MEDIUM)
//                 .ticketStatus(ResolutionTicket.TicketStatus.OPEN)
//                 .insight(insight)
//                 .build();

//         return ticketRepository.save(ticket);
//     }

//     @Transactional
//     public void assignTicket(Long ticketId, Long agentId) {
//         ResolutionTicket ticket = ticketRepository.findById(ticketId)
//                 .orElseThrow(() -> new ResourceNotFoundException("Ticket not found with ID: " + ticketId));

//         PlatformUser agent = userRepository.findById(agentId)
//                 .orElseThrow(() -> new ResourceNotFoundException("Target agent profile allocation not found with ID: " + agentId));

//         // Enforce max 3 unresolved active assignments workload limit constraint
//         List<ResolutionTicket> activeTickets = ticketRepository
//                 .findByAssigneeIdAndTicketStatusNot(agentId, ResolutionTicket.TicketStatus.RESOLVED);

//         if (activeTickets.size() >= 3) {
//             throw new BusinessValidationException("Maximum of 3 pending tickets allowed.");
//         }

//         ticket.setAssignee(agent);
//         ticket.setTicketStatus(ResolutionTicket.TicketStatus.INVESTIGATING);
//         ticketRepository.save(ticket);
//     }

//     @Transactional(rollbackFor = BusinessValidationException.class)
//     public void resolveTicket(Long ticketId, Long agentId, ResolutionDto dto) {
//         ResolutionTicket ticket = ticketRepository.findById(ticketId)
//                 .orElseThrow(() -> new ResourceNotFoundException("Ticket not found with ID: " + ticketId));

//         if (ticket.getAssignee() == null || !ticket.getAssignee().getId().equals(agentId)) {
//             throw new BusinessValidationException("Only the designated assignee layout manager can process resolution tasks.");
//         }

//         ticket.setResolutionNotes(dto.getResolutionNotes());
//         ticket.setTicketStatus(ResolutionTicket.TicketStatus.RESOLVED);
//         ticketRepository.save(ticket);

//         // Update parent entity status lifecycle back down stream 
//         CustomerReview review = ticket.getInsight().getReview();
//         review.setProcessingStatus(CustomerReview.ProcessingStatus.ANALYZED);
//         reviewRepository.save(review);

//         // Publish termination sync hook message context payload 
//         eventPublisher.publishEvent(new TicketResolvedEvent(ticketId));
//     }

//     @Transactional(readOnly = true)
//     public List<ResolutionTicket> getAgentTickets(Long agentId) {
//         return ticketRepository.findByAssigneeId(agentId);
//     }

//     @Transactional(readOnly = true)
//     public List<ResolutionTicket> getAllOpenTickets() {
//         return ticketRepository.findByTicketStatus(ResolutionTicket.TicketStatus.OPEN);
//     }
// }


package com.example.demo.service;

import com.example.demo.dto.ReviewIngestDto;
import com.example.demo.entity.CustomerReview;
import com.example.demo.entity.ResolutionTicket;
import com.example.demo.entity.TrackedProduct;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.CustomerReviewRepository;
import com.example.demo.repository.ResolutionTicketRepository;
import com.example.demo.repository.TrackedProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private static final double NEGATIVE_SENTIMENT_THRESHOLD = 0.4;

    private final CustomerReviewRepository reviewRepository;
    private final TrackedProductRepository productRepository;
    private final ResolutionTicketRepository ticketRepository;
    private final ProductService productService;
    private final ApplicationEventPublisher eventPublisher;

    @Transactional
    public CustomerReview submitReview(ReviewIngestDto dto) {
        TrackedProduct product = productRepository.findById(dto.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + dto.getProductId()));

        double sentimentScore = calculateSentimentScore(dto.getContent(), dto.getRating());

        CustomerReview review = CustomerReview.builder()
                .product(product)
                .content(dto.getContent())
                .rating(dto.getRating())
                .sentimentScore(sentimentScore)
                .build();

        CustomerReview saved = reviewRepository.save(review);

        // Recalculate product metrics
        productService.updateProductMetrics(product.getId());

        // Trigger resolution workflow if sentiment is negative
        if (sentimentScore < NEGATIVE_SENTIMENT_THRESHOLD) {
            createResolutionTicket(saved);
        }

        return saved;
    }

    public List<CustomerReview> getReviewsByProductId(Long productId) {
        return reviewRepository.findByProductId(productId);
    }

    @Transactional
    public void deleteReview(Long id) {
        CustomerReview review = reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Review not found with id: " + id));

        // Delete associated ticket first
        ticketRepository.findByReviewId(id).ifPresent(ticketRepository::delete);

        reviewRepository.delete(review);

        // Recalculate product metrics
        productService.updateProductMetrics(review.getProduct().getId());
    }

    private void createResolutionTicket(CustomerReview review) {
        ResolutionTicket ticket = ResolutionTicket.builder()
                .review(review)
                .status(ResolutionTicket.Status.PENDING)
                .build();
        ticketRepository.save(ticket);
    }

    private double calculateSentimentScore(String content, int rating) {
        // Simple heuristic sentiment analysis based on rating and keyword detection
        double baseScore = rating / 5.0;

        String lower = content.toLowerCase();
        double keywordAdjustment = 0.0;

        String[] positiveWords = {"great", "excellent", "amazing", "love", "best", "good", "awesome", "fantastic", "perfect", "happy"};
        String[] negativeWords = {"bad", "terrible", "awful", "worst", "hate", "poor", "broken", "disappointing", "horrible", "useless"};

        for (String word : positiveWords) {
            if (lower.contains(word)) {
                keywordAdjustment += 0.1;
            }
        }

        for (String word : negativeWords) {
            if (lower.contains(word)) {
                keywordAdjustment -= 0.1;
            }
        }

        double score = baseScore + keywordAdjustment;
        return Math.max(0.0, Math.min(1.0, Math.round(score * 100.0) / 100.0));
    }
}