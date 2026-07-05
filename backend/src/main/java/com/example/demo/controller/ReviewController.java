package com.example.demo.controller;

import com.example.demo.entity.CustomerReview;
import com.example.demo.service.ReviewIngestionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
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
    public CustomerReview createReview(@Valid @RequestBody CustomerReview review) {
        return reviewIngestionService.createReview(review);
    }

    // Get All Reviews
    @GetMapping
    public List<CustomerReview> getAllReviews() {
        return reviewIngestionService.getAllReviews();
    }

    // Get Review By Id
    @GetMapping("/{id}")
    public CustomerReview getReviewById(@PathVariable Long id) {
        return reviewIngestionService.getReviewById(id);
    }

    // Update Review
    @PutMapping("/{id}")
    public CustomerReview updateReview(@PathVariable Long id,
                                       @Valid @RequestBody CustomerReview review) {
        return reviewIngestionService.updateReview(id, review);
    }

    // Delete Review
    @DeleteMapping("/{id}")
    public String deleteReview(@PathVariable Long id) {
        reviewIngestionService.deleteReview(id);
        return "Review deleted successfully";
    }
}