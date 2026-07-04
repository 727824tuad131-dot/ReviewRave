package com.example.demo.listener;

import com.example.demo.entity.CustomerReview;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class ReviewEventListener {

    @EventListener
    public void handleReviewCreated(CustomerReview review) {
        System.out.println("Review Created: " + review);
    }

    @EventListener
    public void handleReviewUpdated(CustomerReview review) {
        System.out.println("Review Updated: " + review);
    }

    @EventListener
    public void handleReviewDeleted(CustomerReview review) {
        System.out.println("Review Deleted: " + review);
    }
}