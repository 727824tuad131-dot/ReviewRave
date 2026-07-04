package com.example.demo.Service;

import com.example.demo.entity.CustomerReview;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class ReviewEventListener {

    @EventListener
    public void onReviewEvent(CustomerReview review) {
        System.out.println("Review Event Received: " + review);
    }
}