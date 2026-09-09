// package com.example.demo.dto;

// import jakarta.validation.constraints.NotBlank;
// import jakarta.validation.constraints.NotNull;

// public class ReviewIngestDto {

//     @NotNull(message = "Product ID is required")
//     private Long productId;

//     @NotBlank(message = "Source platform is required")
//     private String sourcePlatform; // Decoupled to String

//     @NotBlank(message = "Review content is required")
//     private String content;

//     public ReviewIngestDto() {}

//     public ReviewIngestDto(Long productId, String sourcePlatform, String content) {
//         this.productId = productId;
//         this.sourcePlatform = sourcePlatform;
//         this.content = content;
//     }

//     public Long getProductId() { return productId; }
//     public void setProductId(Long productId) { this.productId = productId; }

//     public String getSourcePlatform() { return sourcePlatform; }
//     public void setSourcePlatform(String sourcePlatform) { this.sourcePlatform = sourcePlatform; }

//     public String getContent() { return content; }
//     public void setContent(String content) { this.content = content; }
// }

