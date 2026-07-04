package com.example.demo.service;

import com.example.demo.entity.CustomerReview;
import com.example.demo.repository.CustomerReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewIngestionService {

    @Autowired
    private CustomerReviewRepository customerReviewRepository;

    public CustomerReview createReview(CustomerReview review) {
        return customerReviewRepository.save(review);
    }

    public List<CustomerReview> getAllReviews() {
        return customerReviewRepository.findAll();
    }

    public CustomerReview getReviewById(Long id) {
        return customerReviewRepository.findById(id).orElse(null);
    }

    public CustomerReview updateReview(Long id, CustomerReview review) {

        if (customerReviewRepository.existsById(id)) {
            review.setId(id);      // Requires setId(Long) in CustomerReview
            return customerReviewRepository.save(review);
        }

        return null;
    }

    public void deleteReview(Long id) {
        customerReviewRepository.deleteById(id);
    }
}