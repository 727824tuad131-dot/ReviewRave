package com.example.demo.event;

import org.springframework.context.ApplicationEvent;

public class ReviewIngestedEvent extends ApplicationEvent {
    private final Long productId;

    public ReviewIngestedEvent(Object source, Long productId) {
        super(source);
        this.productId = productId;
    }

    public Long getProductId() { return productId; }
}