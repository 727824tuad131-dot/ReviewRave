package com.example.demo.service;

import com.example.demo.entity.TrackedProduct;
import com.example.demo.repository.TrackedProductRepository;
import jakarta.persistence.EntityNotFoundException;
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
        return trackedProductRepository.findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException("Product not found with id: " + id));
    }

    // Update Product
    public TrackedProduct updateProduct(Long id, TrackedProduct product) {

        TrackedProduct existingProduct = trackedProductRepository.findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException("Product not found with id: " + id));

        existingProduct.setName(product.getName());
        existingProduct.setCategory(product.getCategory());
        existingProduct.setBrand(product.getBrand());

        return trackedProductRepository.save(existingProduct);
    }

    // Delete Product
    public void deleteProduct(Long id) {

        TrackedProduct existingProduct = trackedProductRepository.findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException("Product not found with id: " + id));

        trackedProductRepository.delete(existingProduct);
    }
}