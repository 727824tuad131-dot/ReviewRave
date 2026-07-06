package com.example.demo.controller;

import com.example.demo.entity.SentimentInsight;
import com.example.demo.service.SentimentAnalysisService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/insights")
@CrossOrigin(origins = "*")
public class InsightController {

    @Autowired
    private SentimentAnalysisService sentimentAnalysisService;

    // Create Insight
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SentimentInsight> createInsight(
            @Valid @RequestBody SentimentInsight insight) {

        return ResponseEntity.ok(
                sentimentAnalysisService.createInsight(insight));
    }

    // Get All Insights
    @GetMapping
    public ResponseEntity<List<SentimentInsight>> getAllInsights() {

        return ResponseEntity.ok(
                sentimentAnalysisService.getAllInsights());
    }

    // Get Insight By Id
    @GetMapping("/{id}")
    public ResponseEntity<SentimentInsight> getInsightById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                sentimentAnalysisService.getInsightById(id));
    }

    // Update Insight
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<SentimentInsight> updateInsight(
            @PathVariable Long id,
            @Valid @RequestBody SentimentInsight insight) {

        return ResponseEntity.ok(
                sentimentAnalysisService.updateInsight(id, insight));
    }

    // Delete Insight
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteInsight(@PathVariable Long id) {

        sentimentAnalysisService.deleteInsight(id);
        return ResponseEntity.ok("Insight deleted successfully");
    }
}