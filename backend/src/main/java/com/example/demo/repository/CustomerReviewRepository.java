package com.example.demo.repository;

import com.example.demo.entity.CustomerReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CustomerReviewRepository extends JpaRepository<CustomerReview, Long> {
    
    @Query("SELECT r FROM CustomerReview r WHERE r.product.id = :productId AND r.processingStatus = :status")
    List<CustomerReview> findByProductIdAndProcessingStatus(@Param("productId") Long productId, @Param("status") Object status);
    
    boolean existsByProductIdAndContent(Long productId, String content);
    
    List<CustomerReview> findByProductId(Long productId);
}