package com.example.demo.repository;

import com.example.demo.entity.SentimentInsight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SentimentInsightRepository extends JpaRepository<SentimentInsight, Long> {

    List<SentimentInsight> findBySentiment(String sentiment);

    List<SentimentInsight> findByProductId(Long productId);

}