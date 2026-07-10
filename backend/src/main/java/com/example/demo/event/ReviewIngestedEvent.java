package com.example.demo.event;

import org.springframework.context.ApplicationEvent;

public class ReviewIngestedEvent extends ApplicationEvent {
    private final Long reviewId;

    public ReviewIngestedEvent(Object source, Long reviewId) {
        super(source);
        this.reviewId = reviewId;
    }

    public Long getReviewId() {
        return this.reviewId;
    }
}