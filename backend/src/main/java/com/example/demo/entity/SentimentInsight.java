package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "sentiment_insights")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SentimentInsight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double sentimentScore;

    private String dominantEmotion;

    private boolean isActionable;

    @OneToOne
    @JoinColumn(name = "review_id")
    private CustomerReview review;
}