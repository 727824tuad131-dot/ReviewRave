package com.example.demo.dto;

import com.example.demo.entity.CustomerReview.SourcePlatform; // Direct inner enum import
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ReviewIngestDto {

    @NotNull(message = "Product ID is required")
    private Long productId;

    @NotNull(message = "Source platform is required")
    private SourcePlatform sourcePlatform;

    @NotBlank(message = "Review content is required")
    private String content;

    public ReviewIngestDto() {}

    public ReviewIngestDto(Long productId, SourcePlatform sourcePlatform, String content) {
        this.productId = productId;
        this.sourcePlatform = sourcePlatform;
        this.content = content;
    }

    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }

    public SourcePlatform getSourcePlatform() { return sourcePlatform; }
    public void setSourcePlatform(SourcePlatform sourcePlatform) { this.sourcePlatform = sourcePlatform; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
}