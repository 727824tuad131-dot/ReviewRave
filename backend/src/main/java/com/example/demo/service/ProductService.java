// package com.example.demo.service;

// import com.example.demo.event.ReviewIngestedEvent;
// import lombok.RequiredArgsConstructor;
// import lombok.extern.slf4j.Slf4j;
// import org.springframework.context.event.EventListener;
// import org.springframework.scheduling.annotation.Async;
// import org.springframework.stereotype.Component;

// @Slf4j
// @Component
// @RequiredArgsConstructor
// public class ReviewEventListener {

//     private final SentimentAnalysisService sentimentAnalysisService;

//     @Async
//     @EventListener
//     public void handleReviewIngested(ReviewIngestedEvent event) {
//         log.info("Asynchronously captured ReviewIngestedEvent event for Review ID: {}", event.getReviewId());
//         try {
//             sentimentAnalysisService.processReview(event.getReviewId());
//         } catch (Exception e) {
//             log.error("Asynchronous pipeline failure executing processing workflow context on target layout", e);
//         }
//     }
// }


package com.example.demo.service;

import com.example.demo.dto.ProductCreationDto;
import com.example.demo.dto.ProductSummaryDto;
import com.example.demo.entity.CustomerReview;
import com.example.demo.entity.PlatformUser;
import com.example.demo.entity.TrackedProduct;
import com.example.demo.exception.BusinessValidationException;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.CustomerReviewRepository;
import com.example.demo.repository.ResolutionTicketRepository;
import com.example.demo.repository.TrackedProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final TrackedProductRepository productRepository;
    private final CustomerReviewRepository reviewRepository;
    private final ResolutionTicketRepository ticketRepository;

    @Transactional
    public ProductSummaryDto createProduct(ProductCreationDto dto, PlatformUser owner) {
        if (productRepository.existsByName(dto.getName())) {
            throw new BusinessValidationException("Product with name '" + dto.getName() + "' already exists");
        }

        TrackedProduct product = TrackedProduct.builder()
                .name(dto.getName())
                .category(dto.getCategory())
                .totalReviews(0)
                .avgSentiment(0.0)
                .owner(owner)
                .build();

        TrackedProduct saved = productRepository.save(product);
        return toSummaryDto(saved);
    }

    public List<ProductSummaryDto> getAllProducts() {
        return productRepository.findAll().stream()
                .map(this::toSummaryDto)
                .collect(Collectors.toList());
    }

    public ProductSummaryDto getProductById(Long id) {
        TrackedProduct product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        return toSummaryDto(product);
    }

    @Transactional
    public ProductSummaryDto updateProduct(Long id, ProductCreationDto dto) {
        TrackedProduct product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));

        product.setName(dto.getName());
        product.setCategory(dto.getCategory());

        TrackedProduct updated = productRepository.save(product);
        return toSummaryDto(updated);
    }

    @Transactional
    public void deleteProduct(Long id) {
        TrackedProduct product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));

        // Delete associated tickets first (referential integrity)
        List<CustomerReview> reviews = reviewRepository.findByProductId(id);
        for (CustomerReview review : reviews) {
            ticketRepository.findByReviewId(review.getId()).ifPresent(ticketRepository::delete);
        }

        // Cascade delete reviews via orphanRemoval
        productRepository.delete(product);
    }

    @Transactional
    public void updateProductMetrics(Long productId) {
        TrackedProduct product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + productId));

        List<CustomerReview> reviews = reviewRepository.findByProductId(productId);
        if (reviews.isEmpty()) {
            product.setTotalReviews(0);
            product.setAvgSentiment(0.0);
        } else {
            double avg = reviews.stream()
                    .mapToDouble(CustomerReview::getSentimentScore)
                    .average()
                    .orElse(0.0);
            product.setTotalReviews(reviews.size());
            product.setAvgSentiment(Math.round(avg * 100.0) / 100.0);
        }
        productRepository.save(product);
    }

    private ProductSummaryDto toSummaryDto(TrackedProduct product) {
        return ProductSummaryDto.builder()
                .id(product.getId())
                .name(product.getName())
                .category(product.getCategory())
                .totalReviews(product.getTotalReviews())
                .avgSentiment(product.getAvgSentiment())
                .build();
    }
}