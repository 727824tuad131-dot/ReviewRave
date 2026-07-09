package com.example.demo.repository;

import com.example.demo.entity.SentimentInsight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SentimentInsightRepository extends JpaRepository<SentimentInsight, Long> {
    
    @Query("SELECT AVG(s.sentimentScore) FROM SentimentInsight s WHERE s.review.product.id = :productId")
    Double calculateAverageSentimentForProduct(@Param("productId") Long productId);
    
    List<SentimentInsight> findByReviewProductId(Long productId);
}