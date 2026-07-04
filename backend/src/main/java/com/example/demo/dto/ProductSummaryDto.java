package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductSummaryDto {

    private Long id;
    private String name;
    private String category;
    private Double averageRating;
    private Long reviewCount;
    private Double sentimentScore;
}