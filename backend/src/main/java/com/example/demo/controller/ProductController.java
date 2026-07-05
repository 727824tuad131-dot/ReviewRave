package com.example.demo.controller;

import com.example.demo.entity.TrackedProduct;
import com.example.demo.service.ProductManagementService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private ProductManagementService productManagementService;

    // Create Product
    @PostMapping
    public TrackedProduct createProduct(@Valid @RequestBody TrackedProduct product) {
        return productManagementService.createProduct(product);
    }

    // Get All Products
    @GetMapping
    public List<TrackedProduct> getAllProducts() {
        return productManagementService.getAllProducts();
    }

    // Get Product By Id
    @GetMapping("/{id}")
    public TrackedProduct getProductById(@PathVariable Long id) {
        return productManagementService.getProductById(id);
    }

    // Update Product
    @PutMapping("/{id}")
    public TrackedProduct updateProduct(@PathVariable Long id,
                                        @Valid @RequestBody TrackedProduct product) {
        return productManagementService.updateProduct(id, product);
    }

    // Delete Product
    @DeleteMapping("/{id}")
    public String deleteProduct(@PathVariable Long id) {
        productManagementService.deleteProduct(id);
        return "Product deleted successfully";
    }
}