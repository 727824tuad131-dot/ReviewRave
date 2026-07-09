package com.example.demo.service;

import com.example.demo.entity.CustomerReview;
import com.example.demo.entity.TrackedProduct;
import com.example.demo.repository.CustomerReviewRepository;
import com.example.demo.repository.TrackedProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dto.ReviewIngestDto;
import com.example.demo.event.ReviewIngestedEvent; // Custom domain event
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.exception.BusinessValidationException;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewIngestionService {

    private final CustomerReviewRepository reviewRepository;
    private final TrackedProductRepository productRepository;
    private final ApplicationEventPublisher eventPublisher;

    @Transactional
    public CustomerReview ingestReview(ReviewIngestDto dto) {
        TrackedProduct product = productRepository.findById(dto.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + dto.getProductId()));

        if (reviewRepository.existsByProductIdAndContent(dto.getProductId(), dto.getContent())) {
            throw new BusinessValidationException("Duplicate review detected for this product.");
        }

        CustomerReview review = CustomerReview.builder()
                .sourcePlatform(CustomerReview.SourcePlatform.valueOf(dto.getSourcePlatform()))
                .content(dto.getContent())
                .postedDate(LocalDateTime.now())
                .processingStatus(CustomerReview.ProcessingStatus.NEW)
                .product(product)
                .build();

        CustomerReview savedReview = reviewRepository.save(review);

        // Update core product review count aggregation metrics
        product.setTotalReviews(product.getTotalReviews() + 1);
        productRepository.save(product);

        // Fire asynchronous transaction-bound event
        eventPublisher.publishEvent(new ReviewIngestedEvent(savedReview.getId()));

        return savedReview;
    }

    @Transactional(readOnly = true)
    public List<CustomerReview> getReviewsForProduct(Long productId) {
        return reviewRepository.findByProductId(productId);
    }

    @Transactional
    public void deleteReview(Long id) {
        CustomerReview review = reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Review not found with ID: " + id));
        
        // Counter balance product metrics upon deletion
        TrackedProduct product = review.getProduct();
        if (product.getTotalReviews() > 0) {
            product.setTotalReviews(product.getTotalReviews() - 1);
            productRepository.save(product);
        }
        
        reviewRepository.delete(review);
    }
}