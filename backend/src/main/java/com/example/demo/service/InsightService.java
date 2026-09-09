// package com.example.demo.service;

// import com.example.demo.entity.CustomerReview;
// import com.example.demo.entity.ResolutionTicket;
// import com.example.demo.entity.SentimentInsight;
// import com.example.demo.entity.TrackedProduct;
// import com.example.demo.repository.CustomerReviewRepository;
// import com.example.demo.repository.ResolutionTicketRepository;
// import com.example.demo.repository.SentimentInsightRepository;
// import com.example.demo.repository.TrackedProductRepository;
// import lombok.RequiredArgsConstructor;
// import lombok.extern.slf4j.Slf4j;
// import org.springframework.stereotype.Service;
// import org.springframework.transaction.annotation.Transactional;
// import com.example.demo.exception.ResourceNotFoundException;

// import java.util.Random;

// @Slf4j
// @Service
// @RequiredArgsConstructor
// public class SentimentAnalysisService {

//     private final CustomerReviewRepository reviewRepository;
//     private final SentimentInsightRepository insightRepository;
//     private final ResolutionTicketRepository ticketRepository;
//     private final TrackedProductRepository productRepository;
//     private final Random random = new Random(); // Simulated dynamic pipeline generation

//     @Transactional(rollbackFor = Exception.class)
//     public void processReview(Long reviewId) {
//         log.info("Starting analysis processing routing logic for Review ID: {}", reviewId);
        
//         CustomerReview review = reviewRepository.findById(reviewId)
//                 .orElseThrow(() -> new ResourceNotFoundException("Review not found for processing: " + reviewId));

//         // Simulated score evaluation layout metrics boundaries (0.0 to 5.0)
//         double score = 0.0 + (5.0 - 0.0) * random.nextDouble();
//         // Standardize to 2 decimal points
//         score = Math.round(score * 100.0) / 100.0;

//         String emotion;
//         if (score < 2.0) {
//             emotion = "ANGRY";
//         } else if (score <= 3.5) {
//             emotion = "NEUTRAL";
//         } else {
//             emotion = "HAPPY";
//         }

//         boolean isActionable = score < 2.5;

//         SentimentInsight insight = SentimentInsight.builder()
//                 .sentimentScore(score)
//                 .dominantEmotion(emotion)
//                 .isActionable(isActionable)
//                 .review(review)
//                 .build();

//         SentimentInsight savedInsight = insightRepository.save(insight);

//         if (isActionable) {
//             ResolutionTicket.TicketPriority priority = (score < 1.5) ? 
//                     ResolutionTicket.TicketPriority.CRITICAL : ResolutionTicket.TicketPriority.HIGH;

//             ResolutionTicket ticket = ResolutionTicket.builder()
//                     .priority(priority)
//                     .ticketStatus(ResolutionTicket.TicketStatus.OPEN)
//                     .insight(savedInsight)
//                     .build();

//             ticketRepository.save(ticket);
//             review.setProcessingStatus(CustomerReview.ProcessingStatus.TICKETED);
//         } else {
//             review.setProcessingStatus(CustomerReview.ProcessingStatus.ANALYZED);
//         }

//         reviewRepository.save(review);

//         // Recalculate average product scores instantly via database functional hooks
//         TrackedProduct product = review.getProduct();
//         Double avgScore = insightRepository.calculateAverageSentimentForProduct(product.getId());
//         if (avgScore != null) {
//             product.setAverageSentiment(Math.round(avgScore * 100.0) / 100.0);
//             productRepository.save(product);
//         }
        
//         log.info("Finished routing process for Review ID: {}. Score: {}, Emotion: {}", reviewId, score, emotion);
//     }
// }

package com.example.demo.service;

import com.example.demo.entity.CustomerReview;
import com.example.demo.entity.SentimentInsight;
import com.example.demo.entity.TrackedProduct;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.CustomerReviewRepository;
import com.example.demo.repository.SentimentInsightRepository;
import com.example.demo.repository.TrackedProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InsightService {

    private final SentimentInsightRepository insightRepository;
    private final CustomerReviewRepository reviewRepository;
    private final TrackedProductRepository productRepository;

    @Transactional
    public SentimentInsight generateInsights(Long productId) {
        TrackedProduct product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + productId));

        List<CustomerReview> reviews = reviewRepository.findByProductId(productId);

        String topKeywords = extractTopKeywords(reviews);
        String overallSentiment = determineOverallSentiment(product.getAvgSentiment());

        SentimentInsight insight = insightRepository.findByProductId(productId)
                .orElseGet(() -> SentimentInsight.builder()
                        .product(product)
                        .build());

        insight.setTopKeywords(topKeywords);
        insight.setOverallSentiment(overallSentiment);

        return insightRepository.save(insight);
    }

    public SentimentInsight getInsights(Long productId) {
        return insightRepository.findByProductId(productId)
                .orElseGet(() -> generateInsights(productId));
    }

    public List<SentimentInsight> getAllInsights() {
        return insightRepository.getAllInsights();
    }

    private String extractTopKeywords(List<CustomerReview> reviews) {
        Map<String, Integer> wordFrequency = new HashMap<>();

        Set<String> stopWords = new HashSet<>(Arrays.asList(
                "the", "a", "an", "and", "or", "but", "is", "are", "was", "were",
                "to", "of", "in", "on", "for", "with", "at", "by", "from", "as", "it", "this",
                "that", "i", "my", "me", "we", "our", "you", "your", "very", "really", "so",
                "just", "not", "be", "have", "has", "had", "do", "does", "did", "will", "would"));

        for (CustomerReview review : reviews) {
            String[] words = review.getContent().toLowerCase()
                    .replaceAll("[^a-zA-Z\\s]", "")
                    .split("\\s+");

            for (String word : words) {
                if (word.length() > 3 && !stopWords.contains(word)) {
                    wordFrequency.merge(word, 1, Integer::sum);
                }
            }
        }

        return wordFrequency.entrySet().stream()
                .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
                .limit(10)
                .map(entry -> entry.getKey() + ":" + entry.getValue())
                .collect(Collectors.joining(", "));
    }

    private String determineOverallSentiment(Double avgSentiment) {
        if (avgSentiment == null) {
            return "NEUTRAL";
        }
        if (avgSentiment >= 0.7) {
            return "POSITIVE";
        } else if (avgSentiment >= 0.4) {
            return "NEUTRAL";
        } else {
            return "NEGATIVE";
        }
    }
}