package com.example.demo.event;

public class ReviewIngestedEvent {

    private final Long reviewId;

    public ReviewIngestedEvent(Long reviewId) {
        this.reviewId = reviewId;
    }

    public Long getReviewId() {
        return reviewId;
    }
}