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


package com.example.demo.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReviewIngestDto {

    @NotNull(message = "Product ID is required")
    private Long productId;

    @NotBlank(message = "Review content is required")
    private String content;

    @NotNull(message = "Rating is required")
    @Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 5, message = "Rating must be at most 5")
    private Integer rating;
}