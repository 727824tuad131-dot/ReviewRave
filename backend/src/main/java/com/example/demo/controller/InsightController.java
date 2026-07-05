package com.example.demo.controller;

import com.example.demo.entity.SentimentInsight;
import com.example.demo.service.SentimentAnalysisService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
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
    public SentimentInsight createInsight(@Valid @RequestBody SentimentInsight insight) {
        return sentimentAnalysisService.createInsight(insight);
    }

    // Get All Insights
    @GetMapping
    public List<SentimentInsight> getAllInsights() {
        return sentimentAnalysisService.getAllInsights();
    }

    // Get Insight By Id
    @GetMapping("/{id}")
    public SentimentInsight getInsightById(@PathVariable Long id) {
        return sentimentAnalysisService.getInsightById(id);
    }

    // Update Insight
    @PutMapping("/{id}")
    public SentimentInsight updateInsight(@PathVariable Long id,
                                          @Valid @RequestBody SentimentInsight insight) {
        return sentimentAnalysisService.updateInsight(id, insight);
    }

    // Delete Insight
    @DeleteMapping("/{id}")
    public String deleteInsight(@PathVariable Long id) {
        sentimentAnalysisService.deleteInsight(id);
        return "Insight deleted successfully";
    }
}