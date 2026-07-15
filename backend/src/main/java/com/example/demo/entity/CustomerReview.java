package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "customer_reviews")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerReview {

    public enum SourcePlatform {
        AMAZON,
        FLIPKART,
        WEBSITE,
        OTHER
    }

    public enum ProcessingStatus {
        NEW,
        ANALYZED,
        TICKETED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private SourcePlatform sourcePlatform;

    @Column(length = 2000)
    private String content;

    private LocalDateTime postedDate;

    @Enumerated(EnumType.STRING)
    private ProcessingStatus processingStatus;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private TrackedProduct product;
}