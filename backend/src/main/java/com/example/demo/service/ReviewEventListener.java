package com.example.demo.service;

import com.example.demo.entity.CustomerReview;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class ReviewEventListener {

    @EventListener
    public void handleReviewCreated(CustomerReview review) {
        System.out.println("Review Created Successfully");
        System.out.println("Review ID: " + review.getId());
    }

    @EventListener
    public void handleReviewUpdated(CustomerReview review) {
        System.out.println("Review Updated Successfully");
        System.out.println("Review ID: " + review.getId());
    }

    @EventListener
    public void handleReviewDeleted(CustomerReview review) {
        System.out.println("Review Deleted Successfully");
        System.out.println("Review ID: " + review.getId());
    }
}