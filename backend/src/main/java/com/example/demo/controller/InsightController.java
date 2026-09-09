// package com.example.demo.controller;

// import com.example.demo.entity.SentimentInsight;
// import com.example.demo.repository.SentimentInsightRepository;
// import lombok.RequiredArgsConstructor;
// import org.springframework.http.ResponseEntity;
// import org.springframework.security.access.prepost.PreAuthorize;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;

// @RestController
// @RequestMapping("/api/insights")
// @RequiredArgsConstructor
// public class InsightController {

//     private final SentimentInsightRepository insightRepository;

//     @GetMapping("/product/{productId}")
//     @PreAuthorize("hasRole('BRAND_MANAGER') or hasRole('PLATFORM_ADMIN')")
//     public ResponseEntity<List<SentimentInsight>> getProductInsights(@PathVariable Long productId) {
//         return ResponseEntity.ok(insightRepository.findByReviewProductId(productId));
//     }
// }


package com.example.demo.controller;

import com.example.demo.entity.SentimentInsight;
import com.example.demo.service.InsightService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/insights")
@RequiredArgsConstructor
public class InsightController {

    private final InsightService insightService;

    @GetMapping("/{productId}")
    @PreAuthorize("hasAnyRole('BRAND_MANAGER', 'PLATFORM_ADMIN')")
    public ResponseEntity<SentimentInsight> getInsights(@PathVariable Long productId) {
        return ResponseEntity.ok(insightService.getInsights(productId));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('BRAND_MANAGER', 'PLATFORM_ADMIN')")
    public ResponseEntity<List<SentimentInsight>> getAllInsights() {
        return ResponseEntity.ok(insightService.getAllInsights());
    }
}