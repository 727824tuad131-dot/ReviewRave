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
import com.example.demo.event.ReviewIngestedEvent;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.exception.BusinessValidationException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReviewIngestionService {

    private final CustomerReviewRepository reviewRepository;
    private final TrackedProductRepository productRepository;
    private final ApplicationEventPublisher eventPublisher;


    @Transactional
    public CustomerReview ingestReview(ReviewIngestDto dto) {

        TrackedProduct product = productRepository.findById(dto.getProductId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Product not found with ID: " + dto.getProductId()
                        ));

        if (reviewRepository.existsByProductIdAndContent(
                dto.getProductId(),
                dto.getContent())) {

            throw new BusinessValidationException(
                    "Duplicate review detected for this product."
            );
        }


        CustomerReview review = CustomerReview.builder()
                .sourcePlatform(CustomerReview.SourcePlatform.valueOf(dto.getSourcePlatform()))
                .content(dto.getContent())
                .postedDate(LocalDateTime.now())
                .processingStatus(CustomerReview.ProcessingStatus.NEW)
                .product(product)
                .build();


        CustomerReview savedReview = reviewRepository.save(review);


        product.setTotalReviews(product.getTotalReviews() + 1);
        productRepository.save(product);


        eventPublisher.publishEvent(
                new ReviewIngestedEvent(savedReview.getId())
        );


        return savedReview;
    }


    @Transactional(readOnly = true)
    public List<CustomerReview> getReviewsForProduct(Long productId) {

        return reviewRepository.findByProductId(productId);
    }



    @Transactional
    public void deleteReview(Long id) {


        Optional<CustomerReview> optionalReview =
                reviewRepository.findById(id);


        if (optionalReview == null || optionalReview.isEmpty()) {
            return;
        }


        CustomerReview review = optionalReview.get();


        TrackedProduct product = review.getProduct();


        if (product != null && product.getTotalReviews() > 0) {

            product.setTotalReviews(
                    product.getTotalReviews() - 1
            );

            productRepository.save(product);
        }


        reviewRepository.delete(review);
    }
}