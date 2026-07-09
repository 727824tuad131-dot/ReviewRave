package com.example.demo.service;

import com.example.demo.event.ReviewIngestedEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class ReviewEventListener {

    private final SentimentAnalysisService sentimentAnalysisService;

    @Async
    @EventListener
    public void handleReviewIngested(ReviewIngestedEvent event) {
        log.info("Asynchronously captured ReviewIngestedEvent event for Review ID: {}", event.getReviewId());
        try {
            sentimentAnalysisService.processReview(event.getReviewId());
        } catch (Exception e) {
            log.error("Asynchronous pipeline failure executing processing workflow context on target layout", e);
        }
    }
}