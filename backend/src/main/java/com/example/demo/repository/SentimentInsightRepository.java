package com.example.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.example.entity.SentimentInsight;

public interface SentimentInsightRepository extends JpaRepository<SentimentInsight, Long> {

    Optional<SentimentInsight> findByProductId(Long productId);

    @Query("SELECT s FROM SentimentInsight s")
    List<SentimentInsight> getAllInsights();
}
