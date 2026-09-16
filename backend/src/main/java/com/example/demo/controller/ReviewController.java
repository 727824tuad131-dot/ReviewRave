// package com.example.demo.controller;

// import com.example.demo.dto.ReviewIngestDto;
// import com.example.demo.entity.CustomerReview;
// import com.example.demo.service.ReviewIngestionService;

// import jakarta.validation.Valid;

// import lombok.RequiredArgsConstructor;

// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;

// import org.springframework.security.access.prepost.PreAuthorize;

// import org.springframework.web.bind.annotation.*;

// import java.util.List;


// @RestController
// @RequestMapping("/api/reviews")
// @RequiredArgsConstructor
// public class ReviewController {


//     private final ReviewIngestionService reviewService;


//     // Add new review
//     @PostMapping("/ingest")
//     @PreAuthorize("hasAnyRole('PLATFORM_ADMIN','BRAND_MANAGER')")
//     public ResponseEntity<Void> ingestReview(
//             @Valid @RequestBody ReviewIngestDto dto) {


//         reviewService.ingestReview(dto);

//         return ResponseEntity
//                 .status(HttpStatus.CREATED)
//                 .build();
//     }



//     // Get reviews for product
//     @GetMapping("/product/{productId}")
//     @PreAuthorize("hasAnyRole('PLATFORM_ADMIN','BRAND_MANAGER','USER')")
//     public ResponseEntity<List<CustomerReview>> getProductReviews(
//             @PathVariable Long productId) {


//         return ResponseEntity.ok(
//                 reviewService.getReviewsForProduct(productId)
//         );
//     }



//     // Delete review
//     @DeleteMapping("/{id}")
//     @PreAuthorize("hasAnyRole('PLATFORM_ADMIN','BRAND_MANAGER')")
//     public ResponseEntity<String> deleteReview(
//             @PathVariable Long id) {


//         reviewService.deleteReview(id);


//         return ResponseEntity.ok(
//                 "Review deleted successfully."
//         );
//     }

// }



package com.example.demo.controller;

import com.example.demo.dto.ReviewIngestDto;
import com.example.demo.entity.CustomerReview;
import com.example.demo.service.ReviewIngestionService;
import io.swagger.v3.oas.annotations.Operation;
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
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
@Tag(name = "Review Management", description = "APIs for managing customer reviews")
@SecurityRequirement(name = "Bearer Authentication")
public class ReviewController {

    private final ReviewIngestionService reviewIngestionService;

    @PostMapping
    @PreAuthorize("hasAnyRole('BRAND_MANAGER', 'PLATFORM_ADMIN')")
    @Operation(summary = "Submit a review", description = "Submit a new customer review for a product")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Review submitted successfully",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomerReview.class))),
            @ApiResponse(responseCode = "400", description = "Invalid input")
    })
    public ResponseEntity<CustomerReview> submitReview(@Valid @RequestBody ReviewIngestDto dto) {
        return new ResponseEntity<>(reviewIngestionService.submitReview(dto), HttpStatus.CREATED);
    }

    @GetMapping("/product/{productId}")
    @PreAuthorize("hasAnyRole('BRAND_MANAGER', 'PLATFORM_ADMIN')")
    @Operation(summary = "Get reviews by product", description = "Retrieve all reviews for a specific product")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved reviews",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = CustomerReview.class)))
    })
    public ResponseEntity<List<CustomerReview>> getReviewsByProduct(@PathVariable Long productId) {
        return ResponseEntity.ok(reviewIngestionService.getReviewsForProduct(productId));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('PLATFORM_ADMIN')")
    @Operation(summary = "Delete a review", description = "Delete a customer review by its ID (Platform Admin only)")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Review deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Review not found")
    })
    public ResponseEntity<String> deleteReview(@PathVariable Long id) {
        reviewIngestionService.deleteReview(id);
        return new ResponseEntity<>("Review deleted successfully.", HttpStatus.OK);
    }
}

