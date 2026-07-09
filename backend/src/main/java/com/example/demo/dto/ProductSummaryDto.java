package com.example.demo.dto;

/**
 * Built using explicit custom getters, setters, constructors, 
 * and a manual builder pattern.
 */
public class ProductSummaryDto {

    private Long id;
    private String name;
    private Integer totalReviews;
    private Double avgSentiment;
    private Integer openTickets;

    // Constructors
    public ProductSummaryDto() {}

    public ProductSummaryDto(Long id, String name, Integer totalReviews, Double avgSentiment, Integer openTickets) {
        this.id = id;
        this.name = name;
        this.totalReviews = totalReviews;
        this.avgSentiment = avgSentiment;
        this.openTickets = openTickets;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Integer getTotalReviews() { return totalReviews; }
    public void setTotalReviews(Integer totalReviews) { this.totalReviews = totalReviews; }

    public Double getAvgSentiment() { return avgSentiment; }
    public void setAvgSentiment(Double avgSentiment) { this.avgSentiment = avgSentiment; }

    public Integer getOpenTickets() { return openTickets; }
    public void setOpenTickets(Integer openTickets) { this.openTickets = openTickets; }

    // Manual Builder Pattern Integration
    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private Long id;
        private String name;
        private Integer totalReviews;
        private Double avgSentiment;
        private Integer openTickets;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder name(String name) { this.name = name; return this; }
        public Builder totalReviews(Integer totalReviews) { this.totalReviews = totalReviews; return this; }
        public Builder avgSentiment(Double avgSentiment) { this.avgSentiment = avgSentiment; return this; }
        public Builder openTickets(Integer openTickets) { this.openTickets = openTickets; return this; }

        public ProductSummaryDto build() {
            return new ProductSummaryDto(id, name, totalReviews, avgSentiment, openTickets);
        }
    }
}