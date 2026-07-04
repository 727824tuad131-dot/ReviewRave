package com.example.demo.service;

import com.example.demo.entity.SentimentInsight;
import com.example.demo.repository.SentimentInsightRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SentimentAnalysisService {

    @Autowired
    private SentimentInsightRepository sentimentInsightRepository;

    // Create Insight
    public SentimentInsight createInsight(SentimentInsight insight) {
        return sentimentInsightRepository.save(insight);
    }

    // Get All Insights
    public List<SentimentInsight> getAllInsights() {
        return sentimentInsightRepository.findAll();
    }

    // Get Insight By Id
    public SentimentInsight getInsightById(Long id) {
        return sentimentInsightRepository.findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException("Insight not found with id: " + id));
    }

    // Update Insight
    public SentimentInsight updateInsight(Long id, SentimentInsight insight) {

        if (!sentimentInsightRepository.existsById(id)) {
            throw new EntityNotFoundException("Insight not found with id: " + id);
        }

        insight.setId(id); // Requires setId(Long) in SentimentInsight
        return sentimentInsightRepository.save(insight);
    }

    // Delete Insight
    public void deleteInsight(Long id) {

        if (!sentimentInsightRepository.existsById(id)) {
            throw new EntityNotFoundException("Insight not found with id: " + id);
        }

        sentimentInsightRepository.deleteById(id);
    }
}