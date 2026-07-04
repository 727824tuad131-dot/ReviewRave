package com.example.demo.service;

import com.example.demo.entity.Review;
import com.example.demo.repository.ReviewRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewIngestionService {

    @Autowired
    private ReviewRepository reviewRepository;

    // Create Review
    public Review createReview(Review review) {
        return reviewRepository.save(review);
    }

    // Get All Reviews
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    // Get Review By Id
    public Review getReviewById(Long id) {
        return reviewRepository.findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException("Review not found with id: " + id));
    }

    // Update Review
    public Review updateReview(Long id, Review review) {

        Review existingReview = reviewRepository.findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException("Review not found with id: " + id));

        existingReview.setRating(review.getRating());
        existingReview.setComment(review.getComment());

        return reviewRepository.save(existingReview);
    }

    // Delete Review
    public void deleteReview(Long id) {

        Review existingReview = reviewRepository.findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException("Review not found with id: " + id));

        reviewRepository.delete(existingReview);
    }
}