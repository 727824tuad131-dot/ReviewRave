// package com.example.demo.entity;

// import jakarta.persistence.*;
// import lombok.*;

// @Entity
// @Table(name = "sentiment_insights")
// @Getter
// @Setter
// @NoArgsConstructor
// @AllArgsConstructor
// @Builder
// public class SentimentInsight {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     private Double sentimentScore;

//     private String dominantEmotion;

//     private boolean isActionable;

//     @OneToOne
//     @JoinColumn(name = "review_id")
//     private CustomerReview review;
// }


package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "sentiment_insights")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SentimentInsight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "product_id", nullable = false)
    private TrackedProduct product;

    @Column(name = "top_keywords", columnDefinition = "TEXT")
    private String topKeywords;

    @Column(name = "overall_sentiment", nullable = false)
    private String overallSentiment;
}