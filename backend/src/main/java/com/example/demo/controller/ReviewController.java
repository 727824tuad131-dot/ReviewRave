package com.example.demo.controller;

import com.example.demo.dto.ReviewIngestDto;
import com.example.demo.entity.CustomerReview;
import com.example.demo.service.ReviewIngestionService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.access.prepost.PreAuthorize;

import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {


    private final ReviewIngestionService reviewService;


    // Add new review
    @PostMapping("/ingest")
    @PreAuthorize("hasAnyRole('PLATFORM_ADMIN','BRAND_MANAGER')")
    public ResponseEntity<Void> ingestReview(
            @Valid @RequestBody ReviewIngestDto dto) {


        reviewService.ingestReview(dto);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .build();
    }



    // Get reviews for product
    @GetMapping("/product/{productId}")
    @PreAuthorize("hasAnyRole('PLATFORM_ADMIN','BRAND_MANAGER','USER')")
    public ResponseEntity<List<CustomerReview>> getProductReviews(
            @PathVariable Long productId) {


        return ResponseEntity.ok(
                reviewService.getReviewsForProduct(productId)
        );
    }



    // Delete review
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('PLATFORM_ADMIN','BRAND_MANAGER')")
    public ResponseEntity<String> deleteReview(
            @PathVariable Long id) {


        reviewService.deleteReview(id);


        return ResponseEntity.ok(
                "Review deleted successfully."
        );
    }

}