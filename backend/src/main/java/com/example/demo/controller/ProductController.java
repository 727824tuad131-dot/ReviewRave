package com.example.demo.controller;

import com.example.demo.dto.ProductCreationDto;
import com.example.demo.dto.ProductSummaryDto;
import com.example.demo.entity.PlatformUser;
import com.example.demo.entity.TrackedProduct;
import com.example.demo.service.ProductManagementService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductManagementService productService;

    @GetMapping
    public ResponseEntity<List<TrackedProduct>> getProducts(@AuthenticationPrincipal PlatformUser user) {
        if (user.getRole() == PlatformUser.Role.PLATFORM_ADMIN) {
            return ResponseEntity.ok(productService.getAllProducts());
        }
        return ResponseEntity.ok(productService.getProductsByOwner(user.getId()));
    }

    @PostMapping
    public ResponseEntity<String> createProduct(
            @AuthenticationPrincipal PlatformUser user, 
            @Valid @RequestBody ProductCreationDto dto) {
        productService.createProduct(user.getId(), dto);
        return ResponseEntity.status(HttpStatus.CREATED).body("Product created successfully.");
    }

    @GetMapping("/{id}")
    public ResponseEntity<TrackedProduct> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @GetMapping("/{id}/summary")
    public ResponseEntity<ProductSummaryDto> getProductSummary(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductSummary(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateProduct(
            @PathVariable Long id, 
            @AuthenticationPrincipal PlatformUser user, 
            @Valid @RequestBody ProductCreationDto dto) {
        productService.updateProduct(id, dto, user);
        return ResponseEntity.ok("Product updated successfully.");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(
            @PathVariable Long id, 
            @AuthenticationPrincipal PlatformUser user) {
        productService.deleteProduct(id, user);
        return ResponseEntity.ok("Product deleted successfully.");
    }
}