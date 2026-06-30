package com.example.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.entity.TrackedProduct;

public interface TrackedProductRepository extends JpaRepository<TrackedProduct, Long> {

    List<TrackedProduct> findByCategory(String category);

    Optional<TrackedProduct> findByName(String name);

    boolean existsByName(String name);
}