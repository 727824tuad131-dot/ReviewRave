package com.example.demo.controller;

import com.example.demo.entity.Review;
import com.example.demo.service.ReviewIngestionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<Review> createReview(@Valid @RequestBody Review review) {
        return ResponseEntity.ok(reviewIngestionService.createReview(review));
    }

    // Get All Reviews
    @GetMapping
    public ResponseEntity<List<Review>> getAllReviews() {
        return ResponseEntity.ok(reviewIngestionService.getAllReviews());
    }

    // Get Review By Id
    @GetMapping("/{id}")
    public ResponseEntity<Review> getReviewById(@PathVariable Long id) {
        return ResponseEntity.ok(reviewIngestionService.getReviewById(id));
    }

    // Update Review
    @PutMapping("/{id}")
    public ResponseEntity<Review> updateReview(@PathVariable Long id,
                                               @Valid @RequestBody Review review) {
        return ResponseEntity.ok(reviewIngestionService.updateReview(id, review));
    }

    // Delete Review
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteReview(@PathVariable Long id) {
        reviewIngestionService.deleteReview(id);
        return ResponseEntity.ok("Review deleted successfully");
    }
}