package com.example.demo.repository;

import com.example.demo.entity.TrackedProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TrackedProductRepository extends JpaRepository<TrackedProduct, Long> {

    Optional<TrackedProduct> findByName(String name);

    List<TrackedProduct> findByCategory(String category);

    List<TrackedProduct> findByBrand(String brand);

    boolean existsByName(String name);
}