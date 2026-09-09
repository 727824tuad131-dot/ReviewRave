// package com.example.demo.service;

// import com.example.demo.entity.PlatformUser;
// import com.example.demo.entity.ResolutionTicket;
// import com.example.demo.entity.TrackedProduct;
// import com.example.demo.repository.PlatformUserRepository;
// import com.example.demo.repository.ResolutionTicketRepository;
// import com.example.demo.repository.SentimentInsightRepository;
// import com.example.demo.repository.TrackedProductRepository;
// import lombok.RequiredArgsConstructor;
// import org.springframework.stereotype.Service;
// import org.springframework.transaction.annotation.Transactional;

// import com.example.demo.dto.ProductCreationDto;
// import com.example.demo.dto.ProductSummaryDto;
// import com.example.demo.exception.ResourceNotFoundException;
// import com.example.demo.exception.BusinessValidationException;

// import java.util.List;

// @Service
// @RequiredArgsConstructor
// public class ProductManagementService {

//     private final TrackedProductRepository productRepository;
//     private final PlatformUserRepository userRepository;
//     private final ResolutionTicketRepository ticketRepository;
//     private final SentimentInsightRepository insightRepository;

//     @Transactional
//     public TrackedProduct createProduct(Long ownerId, ProductCreationDto dto) {
//         PlatformUser owner = userRepository.findById(ownerId)
//                 .orElseThrow(() -> new ResourceNotFoundException("Owner not found with ID: " + ownerId));

//         TrackedProduct product = TrackedProduct.builder()
//                 .name(dto.getName())
//                 .category(dto.getCategory())
//                 .totalReviews(0)
//                 .averageSentiment(0.0)
//                 .owner(owner)
//                 .build();

//         return productRepository.save(product);
//     }

//     @Transactional(readOnly = true)
//     public List<TrackedProduct> getProductsByOwner(Long ownerId) {
//         return productRepository.findByOwnerId(ownerId);
//     }

//     @Transactional(readOnly = true)
//     public List<TrackedProduct> getAllProducts() {
//         return productRepository.findAll();
//     }

//     @Transactional(readOnly = true)
//     public TrackedProduct getProductById(Long productId) {
//         return productRepository.findById(productId)
//                 .orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + productId));
//     }

//     @Transactional(readOnly = true)
//     public ProductSummaryDto getProductSummary(Long productId) {
//         TrackedProduct product = getProductById(productId);
        
//         // Count open tickets linked to this product's reviews
//         List<ResolutionTicket> openTickets = ticketRepository
//                 .findByInsightReviewProductIdAndTicketStatus(productId, ResolutionTicket.TicketStatus.OPEN);

//         return ProductSummaryDto.builder()
//                 .productId(product.getId())
//                 .name(product.getName())
//                 .category(product.getCategory())
//                 .totalReviews(product.getTotalReviews())
//                 .averageSentiment(product.getAverageSentiment())
//                 .openTicketsCount(openTickets.size())
//                 .build();
//     }

//     @Transactional
//     public TrackedProduct updateProduct(Long productId, ProductCreationDto dto, PlatformUser user) {
//         TrackedProduct product = getProductById(productId);

//         // Security check: must be owner or platform admin
//         if (!product.getOwner().getId().equals(user.getId()) && !user.getRole().equals(PlatformUser.Role.PLATFORM_ADMIN)) {
//             throw new BusinessValidationException("You do not have permission to update this product.");
//         }

//         product.setName(dto.getName());
//         product.setCategory(dto.getCategory());
//         return productRepository.save(product);
//     }

//     @Transactional
//     public void deleteProduct(Long productId, PlatformUser user) {
//         TrackedProduct product = getProductById(productId);

//         // Admin bypasses ownership checks
//         if (!user.getRole().equals(PlatformUser.Role.PLATFORM_ADMIN) && !product.getOwner().getId().equals(user.getId())) {
//             throw new BusinessValidationException("You do not have permission to delete this product.");
//         }

//         productRepository.delete(product);
//     }
// }


package com.example.demo.service;

import com.example.demo.dto.ProductCreationDto;
import com.example.demo.entity.PlatformUser;
import com.example.demo.entity.TrackedProduct;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.CustomerReviewRepository;
import com.example.demo.repository.PlatformUserRepository;
import com.example.demo.repository.ResolutionTicketRepository;
import com.example.demo.repository.TrackedProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProductManagementService {

    private final TrackedProductRepository productRepository;
    private final PlatformUserRepository userRepository;
    private final CustomerReviewRepository reviewRepository;
    private final ResolutionTicketRepository ticketRepository;

    public ProductManagementService(TrackedProductRepository productRepository,
                                    PlatformUserRepository userRepository,
                                    CustomerReviewRepository reviewRepository,
                                    ResolutionTicketRepository ticketRepository) {
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.reviewRepository = reviewRepository;
        this.ticketRepository = ticketRepository;
    }

    public List<TrackedProduct> getAllProducts() {
        return productRepository.findAll();
    }

    public TrackedProduct getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
    }

    @Transactional
    public TrackedProduct createProduct(ProductCreationDto dto, PlatformUser owner) {
        PlatformUser user = userRepository.findById(owner.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + owner.getId()));

        TrackedProduct product = TrackedProduct.builder()
                .name(dto.getName())
                .category(dto.getCategory())
                .totalReviews(0)
                .avgSentiment(0.0)
                .owner(user)
                .build();

        return productRepository.save(product);
    }

    @Transactional
    public TrackedProduct updateProduct(Long id, ProductCreationDto dto) {
        TrackedProduct product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));

        product.setName(dto.getName());
        product.setCategory(dto.getCategory());

        return productRepository.save(product);
    }

    @Transactional
    public void deleteProduct(Long id, PlatformUser user) {
        TrackedProduct product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));

        productRepository.delete(product);
    }
}
