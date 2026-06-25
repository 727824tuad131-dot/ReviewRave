package com.example.demo.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "tracked_products")
public class TrackedProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String category;

    private Integer totalReviews;

    @Column(name = "avg_sentiment", nullable = false)
    private Double avgSentiment;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private PlatformUser owner;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<CustomerReview> reviews;

    public TrackedProduct() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Integer getTotalReviews() {
        return totalReviews;
    }

    public void setTotalReviews(Integer totalReviews) {
        this.totalReviews = totalReviews;
    }

    public Double getAvgSentiment() {
        return avgSentiment;
    }

    public void setAvgSentiment(Double avgSentiment) {
        this.avgSentiment = avgSentiment;
    }

    public PlatformUser getOwner() {
        return owner;
    }

    public void setOwner(PlatformUser owner) {
        this.owner = owner;
    }

    public List<CustomerReview> getReviews() {
        return reviews;
    }

    public void setReviews(List<CustomerReview> reviews) {
        this.reviews = reviews;
    }
}
