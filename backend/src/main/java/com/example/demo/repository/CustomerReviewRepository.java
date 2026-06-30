package com.example.demo.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.entity.CustomerReview;

public interface CustomerReviewRepository extends JpaRepository<CustomerReview, Long> {

    List<CustomerReview> findByProductId(Long productId);

    List<CustomerReview> findBySentimentScoreLessThan(Double score);
}