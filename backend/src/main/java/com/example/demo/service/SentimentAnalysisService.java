package com.example.demo.service;

import com.example.demo.entity.CustomerReview;
import com.example.demo.entity.ResolutionTicket;
import com.example.demo.entity.SentimentInsight;
import com.example.demo.entity.TrackedProduct;
import com.example.demo.repository.CustomerReviewRepository;
import com.example.demo.repository.ResolutionTicketRepository;
import com.example.demo.repository.SentimentInsightRepository;
import com.example.demo.repository.TrackedProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.demo.exception.ResourceNotFoundException;

import java.util.Random;

@Slf4j
@Service
@RequiredArgsConstructor
public class SentimentAnalysisService {

    private final CustomerReviewRepository reviewRepository;
    private final SentimentInsightRepository insightRepository;
    private final ResolutionTicketRepository ticketRepository;
    private final TrackedProductRepository productRepository;
    private final Random random = new Random(); // Simulated dynamic pipeline generation

    @Transactional(rollbackFor = Exception.class)
    public void processReview(Long reviewId) {
        log.info("Starting analysis processing routing logic for Review ID: {}", reviewId);
        
        CustomerReview review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ResourceNotFoundException("Review not found for processing: " + reviewId));

        // Simulated score evaluation layout metrics boundaries (0.0 to 5.0)
        double score = 0.0 + (5.0 - 0.0) * random.nextDouble();
        // Standardize to 2 decimal points
        score = Math.round(score * 100.0) / 100.0;

        String emotion;
        if (score < 2.0) {
            emotion = "ANGRY";
        } else if (score <= 3.5) {
            emotion = "NEUTRAL";
        } else {
            emotion = "HAPPY";
        }

        boolean isActionable = score < 2.5;

        SentimentInsight insight = SentimentInsight.builder()
                .sentimentScore(score)
                .dominantEmotion(emotion)
                .isActionable(isActionable)
                .review(review)
                .build();

        SentimentInsight savedInsight = insightRepository.save(insight);

        if (isActionable) {
            ResolutionTicket.TicketPriority priority = (score < 1.5) ? 
                    ResolutionTicket.TicketPriority.CRITICAL : ResolutionTicket.TicketPriority.HIGH;

            ResolutionTicket ticket = ResolutionTicket.builder()
                    .priority(priority)
                    .ticketStatus(ResolutionTicket.TicketStatus.OPEN)
                    .insight(savedInsight)
                    .build();

            ticketRepository.save(ticket);
            review.setProcessingStatus(CustomerReview.ProcessingStatus.TICKETED);
        } else {
            review.setProcessingStatus(CustomerReview.ProcessingStatus.ANALYZED);
        }

        reviewRepository.save(review);

        // Recalculate average product scores instantly via database functional hooks
        TrackedProduct product = review.getProduct();
        Double avgScore = insightRepository.calculateAverageSentimentForProduct(product.getId());
        if (avgScore != null) {
            product.setAverageSentiment(Math.round(avgScore * 100.0) / 100.0);
            productRepository.save(product);
        }
        
        log.info("Finished routing process for Review ID: {}. Score: {}, Emotion: {}", reviewId, score, emotion);
    }
}