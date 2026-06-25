package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "sentiment_insights")
public class SentimentInsight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "product_id")
    private TrackedProduct product;

    @Column(columnDefinition = "TEXT")
    private String topKeywords;

    @Column(nullable = false)
    private String overallSentiment;

    public SentimentInsight() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TrackedProduct getProduct() {
        return product;
    }

    public void setProduct(TrackedProduct product) {
        this.product = product;
    }

    public String getTopKeywords() {
        return topKeywords;
    }

    public void setTopKeywords(String topKeywords) {
        this.topKeywords = topKeywords;
    }

    public String getOverallSentiment() {
        return overallSentiment;
    }

    public void setOverallSentiment(String overallSentiment) {
        this.overallSentiment = overallSentiment;
    }
}