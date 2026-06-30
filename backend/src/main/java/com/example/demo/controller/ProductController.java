package com.example.demo.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    @Autowired
    private ProductService productService;

    @PreAuthorize("hasRole('BRAND_MANAGER')")
    @PostMapping
    public Object createProduct(@Valid @RequestBody ProductDTO dto) {
        return productService.createProduct(dto);
    }

    @GetMapping
    public Object getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Object getProduct(@PathVariable Long id) {
        return productService.getProduct(id);
    }

    @PreAuthorize("hasRole('BRAND_MANAGER')")
    @PutMapping("/{id}")
    public Object updateProduct(@PathVariable Long id,
                                @Valid @RequestBody ProductDTO dto) {
        return productService.updateProduct(id, dto);
    }

    @PreAuthorize("hasRole('PLATFORM_ADMIN')")
    @DeleteMapping("/{id}")
    public Object deleteProduct(@PathVariable Long id) {
        return productService.deleteProduct(id);
    }
}