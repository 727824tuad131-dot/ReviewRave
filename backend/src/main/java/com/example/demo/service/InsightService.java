// package com.example.demo.service;

// import com.example.demo.entity.CustomerReview;
// import com.example.demo.entity.TrackedProduct;
// import com.example.demo.repository.CustomerReviewRepository;
// import com.example.demo.repository.TrackedProductRepository;
// import lombok.RequiredArgsConstructor;
// import org.springframework.context.ApplicationEventPublisher;
// import org.springframework.stereotype.Service;
// import org.springframework.transaction.annotation.Transactional;

// import com.example.demo.dto.ReviewIngestDto;
// import com.example.demo.event.ReviewIngestedEvent;
// import com.example.demo.exception.ResourceNotFoundException;
// import com.example.demo.exception.BusinessValidationException;

// import java.time.LocalDateTime;
// import java.util.List;
// import java.util.Optional;

// @Service
// @RequiredArgsConstructor
// public class ReviewIngestionService {

//     private final CustomerReviewRepository reviewRepository;
//     private final TrackedProductRepository productRepository;
//     private final ApplicationEventPublisher eventPublisher;


//     @Transactional
//     public CustomerReview ingestReview(ReviewIngestDto dto) {

//         TrackedProduct product = productRepository.findById(dto.getProductId())
//                 .orElseThrow(() ->
//                         new ResourceNotFoundException(
//                                 "Product not found with ID: " + dto.getProductId()
//                         ));

//         if (reviewRepository.existsByProductIdAndContent(
//                 dto.getProductId(),
//                 dto.getContent())) {

//             throw new BusinessValidationException(
//                     "Duplicate review detected for this product."
//             );
//         }


//         CustomerReview review = CustomerReview.builder()
//                 .sourcePlatform(CustomerReview.SourcePlatform.valueOf(dto.getSourcePlatform()))
//                 .content(dto.getContent())
//                 .postedDate(LocalDateTime.now())
//                 .processingStatus(CustomerReview.ProcessingStatus.NEW)
//                 .product(product)
//                 .build();


//         CustomerReview savedReview = reviewRepository.save(review);


//         product.setTotalReviews(product.getTotalReviews() + 1);
//         productRepository.save(product);


//         eventPublisher.publishEvent(
//                 new ReviewIngestedEvent(savedReview.getId())
//         );


//         return savedReview;
//     }


//     @Transactional(readOnly = true)
//     public List<CustomerReview> getReviewsForProduct(Long productId) {

//         return reviewRepository.findByProductId(productId);
//     }



//     @Transactional
//     public void deleteReview(Long id) {


//         Optional<CustomerReview> optionalReview =
//                 reviewRepository.findById(id);


//         if (optionalReview == null || optionalReview.isEmpty()) {
//             return;
//         }


//         CustomerReview review = optionalReview.get();


//         TrackedProduct product = review.getProduct();


//         if (product != null && product.getTotalReviews() > 0) {

//             product.setTotalReviews(
//                     product.getTotalReviews() - 1
//             );

//             productRepository.save(product);
//         }


//         reviewRepository.delete(review);
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
        return insightRepository.findBinsightserviceyProductId(productId)
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