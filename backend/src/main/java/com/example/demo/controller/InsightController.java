package com.example.demo.controller;

import com.example.demo.entity.SentimentInsight;
import com.example.demo.service.InsightService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/insights")
@CrossOrigin(origins = "*")
public class InsightController {

    @Autowired
    private InsightService insightService;

    @PostMapping
    public SentimentInsight createInsight(@Valid @RequestBody SentimentInsight insight) {
        return insightService.createInsight(insight);
    }

    @GetMapping
    public List<SentimentInsight> getAllInsights() {
        return insightService.getAllInsights();
    }

    @GetMapping("/{id}")
    public SentimentInsight getInsightById(@PathVariable Long id) {
        return insightService.getInsightById(id);
    }

    @PutMapping("/{id}")
    public SentimentInsight updateInsight(@PathVariable Long id,
                                          @Valid @RequestBody SentimentInsight insight) {
        return insightService.updateInsight(id, insight);
    }

    @DeleteMapping("/{id}")
    public String deleteInsight(@PathVariable Long id) {
        insightService.deleteInsight(id);
        return "Insight deleted successfully";
    }
}