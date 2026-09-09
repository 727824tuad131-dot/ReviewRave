
package com.example.demo.service;

import com.example.demo.entity.PlatformUser;
import com.example.demo.exception.BusinessValidationException;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.PlatformUserRepository;
import com.example.demo.repository.ResolutionTicketRepository;
import com.example.demo.repository.TrackedProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final PlatformUserRepository userRepository;
    private final TrackedProductRepository productRepository;
    private final ResolutionTicketRepository ticketRepository;

    public List<PlatformUser> getAllUsers() {
        return userRepository.findAll();
    }

    @Transactional
    public void deleteUser(Long id) {
        PlatformUser user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));

        // Unassign tickets assigned to this user
        ticketRepository.findByAgentId(id).forEach(ticket -> {
            ticket.setAgent(null);
            ticket.setStatus(com.example.demo.entity.ResolutionTicket.Status.PENDING);
            ticketRepository.save(ticket);
        });

        // Unassign products owned by this user
        productRepository.findAll().stream()
                .filter(product -> product.getOwner() != null && product.getOwner().getId().equals(id))
                .forEach(product -> {
                    product.setOwner(null);
                    productRepository.save(product);
                });

        userRepository.delete(user);
    }
}