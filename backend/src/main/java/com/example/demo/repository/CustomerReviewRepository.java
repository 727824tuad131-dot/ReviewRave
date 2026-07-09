package com.example.demo.repository;

import com.example.demo.entity.CustomerReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CustomerReviewRepository extends JpaRepository<CustomerReview, Long> {
    
    // Explicitly reference CustomerReview.ProcessingStatus
    List<CustomerReview> findByProductIdAndProcessingStatus(Long productId, com.example.demo.entity.CustomerReview.ProcessingStatus status);
    
    boolean existsByProductIdAndContent(Long productId, String content);
    
    List<CustomerReview> findByProductId(Long productId);
}