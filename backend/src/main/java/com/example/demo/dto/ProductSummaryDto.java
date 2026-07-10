package com.example.demo.dto;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductSummaryDto {
    private Long productId; // Fixes: productId() builder method target
    private String name;
    private Integer totalReviews;
    private Double averageSentiment;
}