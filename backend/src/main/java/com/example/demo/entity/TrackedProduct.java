package com.example.demo.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "tracked_products")
public class TrackedProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    private String category;

    private String brand;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private PlatformUser owner;

    private Integer totalReviews = 0;

    private Double averageSentiment = 0.0;

    public TrackedProduct() {
    }

    public TrackedProduct(Long id, String name, String category, String brand,
                          PlatformUser owner, Integer totalReviews,
                          Double averageSentiment) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.brand = brand;
        this.owner = owner;
        this.totalReviews = totalReviews;
        this.averageSentiment = averageSentiment;
    }

    // Builder
    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private final TrackedProduct product = new TrackedProduct();

        public Builder id(Long id) {
            product.setId(id);
            return this;
        }

        public Builder name(String name) {
            product.setName(name);
            return this;
        }

        public Builder category(String category) {
            product.setCategory(category);
            return this;
        }

        public Builder brand(String brand) {
            product.setBrand(brand);
            return this;
        }

        public Builder owner(PlatformUser owner) {
            product.setOwner(owner);
            return this;
        }

        public Builder totalReviews(Integer totalReviews) {
            product.setTotalReviews(totalReviews);
            return this;
        }

        public Builder averageSentiment(Double averageSentiment) {
            product.setAverageSentiment(averageSentiment);
            return this;
        }

        public TrackedProduct build() {
            return product;
        }
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

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public PlatformUser getOwner() {
        return owner;
    }

    public void setOwner(PlatformUser owner) {
        this.owner = owner;
    }

    public Integer getTotalReviews() {
        return totalReviews;
    }

    public void setTotalReviews(Integer totalReviews) {
        this.totalReviews = totalReviews;
    }

    public Double getAverageSentiment() {
        return averageSentiment;
    }

    public void setAverageSentiment(Double averageSentiment) {
        this.averageSentiment = averageSentiment;
    }
}