package com.example.demo.event;

import org.springframework.context.ApplicationEvent;

public class ReviewIngestedEvent extends ApplicationEvent {

    private final Long reviewId;

    /**
     * Constructs a prototype Event.
     *
     * @param source   the object on which the Event initially occurred or with 
     * which the Event is associated (typically 'this' in the publisher)
     * @param reviewId the primary key reference identifier of the ingested review
     */
    public ReviewIngestedEvent(Object source, Long reviewId) {
        super(source);
        this.reviewId = reviewId;
    }

    public Long getReviewId() {
        return reviewId;
    }
}