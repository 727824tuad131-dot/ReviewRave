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

import com.example.demo.dto.ReviewIngestDto;
import com.example.demo.entity.CustomerReview;
import com.example.demo.entity.TrackedProduct;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.CustomerReviewRepository;
import com.example.demo.repository.ResolutionTicketRepository;
import com.example.demo.repository.TrackedProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ReviewIngestionService {

    private final CustomerReviewRepository reviewRepository;
    private final TrackedProductRepository productRepository;
    private final ResolutionTicketRepository ticketRepository;

    public ReviewIngestionService(CustomerReviewRepository reviewRepository,
                                  TrackedProductRepository productRepository,
                                  ResolutionTicketRepository ticketRepository) {
        this.reviewRepository = reviewRepository;
        this.productRepository = productRepository;
        this.ticketRepository = ticketRepository;
    }

    public List<CustomerReview> getReviewsForProduct(Long productId) {
        return reviewRepository.findByProductId(productId);
    }

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

        return reviewRepository.save(review);
    }

    @Transactional
    public void deleteReview(Long id) {
        if (!reviewRepository.existsById(id)) {
            throw new ResourceNotFoundException("Review not found with id: " + id);
        }
        reviewRepository.deleteById(id);
    }

    private double calculateSentimentScore(String content, int rating) {
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