package com.example.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.entity.CustomerReview;

public interface CustomerReviewRepository extends JpaRepository<CustomerReview, Long> {

    List<CustomerReview> findByProductId(Long productId);

    List<CustomerReview> findBySentimentScoreLessThan(Double score);
}