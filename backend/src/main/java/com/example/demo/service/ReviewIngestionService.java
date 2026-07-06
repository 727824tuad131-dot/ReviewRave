package com.example.demo.service;

import com.example.demo.entity.CustomerReview;
import com.example.demo.repository.CustomerReviewRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewIngestionService {

    @Autowired
    private CustomerReviewRepository customerReviewRepository;

    // Create Review
    public CustomerReview createReview(CustomerReview review) {
        return customerReviewRepository.save(review);
    }

    // Get All Reviews
    public List<CustomerReview> getAllReviews() {
        return customerReviewRepository.findAll();
    }

    // Get Review By Id
    public CustomerReview getReviewById(Long id) {
        return customerReviewRepository.findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException("Review not found with id: " + id));
    }

    // Update Review
    public CustomerReview updateReview(Long id, CustomerReview review) {

        CustomerReview existingReview = customerReviewRepository.findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException("Review not found with id: " + id));

        existingReview.setReviewerName(review.getReviewerName());
        existingReview.setComment(review.getComment());
        existingReview.setRating(review.getRating());

        return customerReviewRepository.save(existingReview);
    }

    // Delete Review
    public void deleteReview(Long id) {

        if (!customerReviewRepository.existsById(id)) {
            throw new EntityNotFoundException("Review not found with id: " + id);
        }

        customerReviewRepository.deleteById(id);
    }
}