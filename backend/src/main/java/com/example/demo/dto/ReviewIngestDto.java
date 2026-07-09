package com.example.demo.dto;

import com.example.demo.entity.CustomerReview;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

/**
 * Built using explicit custom constructors, getters, and setters.
 */
public class ReviewIngestDto {

    @NotNull(message = "Product ID is required")
    private Long productId;

    @NotNull(message = "Source platform is required")
    private CustomerReview.SourcePlatform sourcePlatform;

    @NotBlank(message = "Review content is required")
    private String content;

    // Constructors
    public ReviewIngestDto() {}

    public ReviewIngestDto(Long productId, CustomerReview.SourcePlatform sourcePlatform, String content) {
        this.productId = productId;
        this.sourcePlatform = sourcePlatform;
        this.content = content;
    }

    // Getters and Setters
    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }

    public CustomerReview.SourcePlatform getSourcePlatform() { return sourcePlatform; }
    public void setSourcePlatform(CustomerReview.SourcePlatform sourcePlatform) { this.sourcePlatform = sourcePlatform; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
}