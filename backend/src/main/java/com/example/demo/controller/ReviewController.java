package com.example.demo.controller;

import com.example.demo.entity.CustomerReview;
import com.example.demo.service.ReviewIngestionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "*")
public class ReviewController {

    @Autowired
    private ReviewIngestionService reviewIngestionService;

    // Create Review
    @PostMapping
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<CustomerReview> createReview(
            @Valid @RequestBody CustomerReview review) {

        return ResponseEntity.ok(reviewIngestionService.createReview(review));
    }

    // Get All Reviews
    @GetMapping
    public ResponseEntity<List<CustomerReview>> getAllReviews() {

        return ResponseEntity.ok(reviewIngestionService.getAllReviews());
    }

    // Get Review By Id
    @GetMapping("/{id}")
    public ResponseEntity<CustomerReview> getReviewById(@PathVariable Long id) {

        return ResponseEntity.ok(reviewIngestionService.getReviewById(id));
    }

    // Update Review
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<CustomerReview> updateReview(
            @PathVariable Long id,
            @Valid @RequestBody CustomerReview review) {

        return ResponseEntity.ok(
                reviewIngestionService.updateReview(id, review));
    }

    // Delete Review
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteReview(@PathVariable Long id) {

        reviewIngestionService.deleteReview(id);
        return ResponseEntity.ok("Review deleted successfully");
    }
}