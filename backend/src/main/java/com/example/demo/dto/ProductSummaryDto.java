// package com.example.demo.dto;

// import lombok.AllArgsConstructor;
// import lombok.Builder;
// import lombok.Data;
// import lombok.NoArgsConstructor;

// @Data
// @Builder
// @NoArgsConstructor
// @AllArgsConstructor
// public class ProductSummaryDto {

//     private Long productId;
//     private String name;
//     private String category;
//     private Integer totalReviews;
//     private Double averageSentiment;
//     private Integer openTicketsCount;
// }


package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductSummaryDto {

    private Long id;
    private String name;
    private String category;
    private Integer totalReviews;
    private Double avgSentiment;
}