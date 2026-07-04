package com.example.demo.controller;

import com.example.demo.entity.Product;
import com.example.demo.service.ProductManagementService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
    @PreAuthorize("hasRole('ADMIN') or hasRole('BRAND_MANAGER')")
    public ResponseEntity<Product> createProduct(@Valid @RequestBody Product product) {
        return ResponseEntity.ok(productManagementService.createProduct(product));
    }

    // Get All Products
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productManagementService.getAllProducts());
    }

    // Get Product By Id
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productManagementService.getProductById(id));
    }

    // Update Product
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('BRAND_MANAGER')")
    public ResponseEntity<Product> updateProduct(
            @PathVariable Long id,
            @Valid @RequestBody Product product) {

        return ResponseEntity.ok(
                productManagementService.updateProduct(id, product));
    }

    // Delete Product
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole(" + "'ADMIN'" + ")")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
        productManagementService.deleteProduct(id);
        return ResponseEntity.ok("Product deleted successfully");
    }
}