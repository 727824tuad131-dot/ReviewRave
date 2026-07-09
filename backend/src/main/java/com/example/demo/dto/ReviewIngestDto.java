package com.example.demo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ReviewIngestDto {

    @NotNull(message = "Product ID is required")
    private Long productId;

    // Fully qualified reference to the nested Enum inside CustomerReview
    @NotNull(message = "Source platform is required")
    private com.example.demo.entity.CustomerReview.SourcePlatform sourcePlatform;

    @NotBlank(message = "Review content is required")
    private String content;

    public ReviewIngestDto() {}

    public ReviewIngestDto(Long productId, com.example.demo.entity.CustomerReview.SourcePlatform sourcePlatform, String content) {
        this.productId = productId;
        this.sourcePlatform = sourcePlatform;
        this.content = content;
    }

    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }

    public com.example.demo.entity.CustomerReview.SourcePlatform getSourcePlatform() { return sourcePlatform; }
    public void setSourcePlatform(com.example.demo.entity.CustomerReview.SourcePlatform sourcePlatform) { this.sourcePlatform = sourcePlatform; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
}