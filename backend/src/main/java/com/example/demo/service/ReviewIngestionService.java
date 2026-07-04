package com.example.demo.service;

import com.example.demo.entity.Review;
import com.example.demo.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewIngestionService {

    @Autowired
    private ReviewRepository reviewRepository;

    public Review createReview(Review review) {
        return reviewRepository.save(review);
    }

    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    public Review getReviewById(Long id) {
        return reviewRepository.findById(id).orElse(null);
    }

    public Review updateReview(Long id, Review review) {

        Review existingReview = reviewRepository.findById(id).orElse(null);

        if (existingReview != null) {
            existingReview.setRating(review.getRating());
            existingReview.setComment(review.getComment());
            return reviewRepository.save(existingReview);
        }

        return null;
    }

    public void deleteReview(Long id) {
        reviewRepository.deleteById(id);
    }
}