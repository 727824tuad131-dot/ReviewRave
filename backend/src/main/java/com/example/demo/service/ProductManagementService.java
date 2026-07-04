package com.example.demo.service;

import com.example.demo.entity.TrackedProduct;
import com.example.demo.repository.TrackedProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductManagementService {

    @Autowired
    private TrackedProductRepository trackedProductRepository;

    // Create Product
    public TrackedProduct createProduct(TrackedProduct product) {
        return trackedProductRepository.save(product);
    }

    // Get All Products
    public List<TrackedProduct> getAllProducts() {
        return trackedProductRepository.findAll();
    }

    // Get Product By Id
    public TrackedProduct getProductById(Long id) {
        return trackedProductRepository.findById(id).orElse(null);
    }

    // Update Product
    public TrackedProduct updateProduct(Long id, TrackedProduct product) {

        if (trackedProductRepository.existsById(id)) {
            product.setId(id);   // Requires a setId(Long) method
            return trackedProductRepository.save(product);
        }

        return null;
    }

    // Delete Product
    public void deleteProduct(Long id) {
        trackedProductRepository.deleteById(id);
    }
}