// package com.example.demo.entity;

// import jakarta.persistence.*;
// import lombok.*;

// import java.time.LocalDateTime;

// @Entity
// @Table(name = "customer_reviews")
// @Getter
// @Setter
// @NoArgsConstructor
// @AllArgsConstructor
// @Builder
// public class CustomerReview {

//     public enum SourcePlatform {
//         AMAZON,
//         FLIPKART,
//         WEBSITE,
//         OTHER
//     }

//     public enum ProcessingStatus {
//         NEW,
//         ANALYZED,
//         TICKETED
//     }

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     @Enumerated(EnumType.STRING)
//     private SourcePlatform sourcePlatform;

//     @Column(length = 2000)
//     private String content;

//     private LocalDateTime postedDate;

//     @Enumerated(EnumType.STRING)
//     private ProcessingStatus processingStatus;

//     @ManyToOne
//     @JoinColumn(name = "product_id")
//     private TrackedProduct product;
// }


package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "customer_reviews")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CustomerReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private TrackedProduct product;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    @Column(nullable = false)
    private Integer rating;

    @Column(name = "sentiment_score", nullable = false)
    private Double sentimentScore;
}