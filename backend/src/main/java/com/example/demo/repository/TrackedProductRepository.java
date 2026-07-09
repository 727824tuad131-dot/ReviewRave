package com.example.demo.repository;

import com.example.demo.entity.TrackedProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrackedProductRepository extends JpaRepository<TrackedProduct, Long> {
    
    /**
     * Fetches products belonging to a brand manager.
     */
    List<TrackedProduct> findByOwnerId(Long ownerId);
}