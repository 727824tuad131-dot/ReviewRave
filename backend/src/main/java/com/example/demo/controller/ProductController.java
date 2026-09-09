// package com.example.demo.controller;

// import com.example.demo.dto.ProductCreationDto;
// import com.example.demo.dto.ProductSummaryDto;
// import com.example.demo.entity.PlatformUser;
// import com.example.demo.entity.TrackedProduct;
// import com.example.demo.service.ProductManagementService;

// import jakarta.validation.Valid;

// import lombok.RequiredArgsConstructor;

// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;

// import org.springframework.security.access.prepost.PreAuthorize;
// import org.springframework.security.core.annotation.AuthenticationPrincipal;

// import org.springframework.web.bind.annotation.*;

// import java.util.List;


// @RestController
// @RequestMapping("/api/products")
// @RequiredArgsConstructor
// public class ProductController {


//     private final ProductManagementService productService;



//     // Get all products
//     @GetMapping
//     @PreAuthorize("hasAnyRole('USER','BRAND_MANAGER','PLATFORM_ADMIN')")
//     public ResponseEntity<List<TrackedProduct>> getProducts(
//             @AuthenticationPrincipal PlatformUser user) {


//         if (user.getRole() == PlatformUser.Role.PLATFORM_ADMIN) {
//             return ResponseEntity.ok(
//                     productService.getAllProducts()
//             );
//         }


//         return ResponseEntity.ok(
//                 productService.getProductsByOwner(user.getId())
//         );
//     }



//     // Create product
//     @PostMapping
//     @PreAuthorize("hasAnyRole('BRAND_MANAGER','PLATFORM_ADMIN')")
//     public ResponseEntity<String> createProduct(
//             @AuthenticationPrincipal PlatformUser user,
//             @Valid @RequestBody ProductCreationDto dto) {


//         productService.createProduct(
//                 user.getId(),
//                 dto
//         );


//         return ResponseEntity
//                 .status(HttpStatus.CREATED)
//                 .body("Product created successfully.");
//     }




//     // Get product by id
//     @GetMapping("/{id}")
//     @PreAuthorize("hasAnyRole('USER','BRAND_MANAGER','PLATFORM_ADMIN')")
//     public ResponseEntity<TrackedProduct> getProductById(
//             @PathVariable Long id) {


//         return ResponseEntity.ok(
//                 productService.getProductById(id)
//         );
//     }




//     // Product summary
//     @GetMapping("/{id}/summary")
//     @PreAuthorize("hasAnyRole('USER','BRAND_MANAGER','PLATFORM_ADMIN')")
//     public ResponseEntity<ProductSummaryDto> getProductSummary(
//             @PathVariable Long id) {


//         return ResponseEntity.ok(
//                 productService.getProductSummary(id)
//         );
//     }




//     // Update product
//     @PutMapping("/{id}")
//     @PreAuthorize("hasAnyRole('BRAND_MANAGER','PLATFORM_ADMIN')")
//     public ResponseEntity<String> updateProduct(
//             @PathVariable Long id,
//             @AuthenticationPrincipal PlatformUser user,
//             @Valid @RequestBody ProductCreationDto dto) {


//         productService.updateProduct(
//                 id,
//                 dto,
//                 user
//         );


//         return ResponseEntity.ok(
//                 "Product updated successfully."
//         );
//     }




//     // Delete product
//     @DeleteMapping("/{id}")
//     @PreAuthorize("hasRole('PLATFORM_ADMIN')")
//     public ResponseEntity<String> deleteProduct(
//             @PathVariable Long id,
//             @AuthenticationPrincipal PlatformUser user) {


//         productService.deleteProduct(
//                 id,
//                 user
//         );


//         return ResponseEntity.ok(
//                 "Product deleted successfully."
//         );
//     }

// }


package com.example.demo.controller;

import com.example.demo.dto.ProductCreationDto;
import com.example.demo.entity.PlatformUser;
import com.example.demo.entity.TrackedProduct;
import com.example.demo.service.ProductManagementService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@Tag(name = "Product Management", description = "APIs for managing tracked products")
@SecurityRequirement(name = "Bearer Authentication")
public class ProductController {

    private final ProductManagementService productManagementService;

    @GetMapping
    @PreAuthorize("hasAnyRole('BRAND_MANAGER', 'PLATFORM_ADMIN')")
    @Operation(summary = "Get all products", description = "Retrieve a list of all tracked products")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved list of products",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = TrackedProduct.class)))
    })
    public ResponseEntity<List<TrackedProduct>> getProducts(PlatformUser user) {
        return ResponseEntity.ok(productManagementService.getAllProducts());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('BRAND_MANAGER', 'PLATFORM_ADMIN')")
    @Operation(summary = "Get product by ID", description = "Retrieve a specific product by its ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved the product",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = TrackedProduct.class))),
            @ApiResponse(responseCode = "404", description = "Product not found")
    })
    public ResponseEntity<TrackedProduct> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productManagementService.getProductById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('BRAND_MANAGER')")
    @Operation(summary = "Create a new product", description = "Create a new tracked product (Brand Manager only)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Product created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid input or product already exists")
    })
    public ResponseEntity<String> createProduct(PlatformUser user, @Valid @RequestBody ProductCreationDto dto) {
        productManagementService.createProduct(dto, user);
        return new ResponseEntity<>("Product created successfully.", HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('BRAND_MANAGER')")
    @Operation(summary = "Update a product", description = "Update an existing product by its ID (Brand Manager only)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Product updated successfully"),
            @ApiResponse(responseCode = "404", description = "Product not found")
    })
    public ResponseEntity<String> updateProduct(@PathVariable Long id, PlatformUser user, @Valid @RequestBody ProductCreationDto dto) {
        productManagementService.updateProduct(id, dto);
        return new ResponseEntity<>("Product updated successfully.", HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('PLATFORM_ADMIN')")
    @Operation(summary = "Delete a product", description = "Delete a tracked product by its ID (Platform Admin only)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Product deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Product not found")
    })
    public ResponseEntity<String> deleteProduct(@PathVariable Long id, PlatformUser user) {
        productManagementService.deleteProduct(id, user);
        return new ResponseEntity<>("Product deleted successfully.", HttpStatus.OK);
    }
}