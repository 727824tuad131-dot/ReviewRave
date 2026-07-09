package com.example.demo.controller;

import com.example.demo.entity.PlatformUser;
import com.example.demo.repository.PlatformUserRepository;
import com.example.demo.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final PlatformUserRepository userRepository;

    @GetMapping
    @PreAuthorize("hasRole('PLATFORM_ADMIN')")
    public ResponseEntity<List<PlatformUser>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @PutMapping("/{id}/toggle-status")
    @PreAuthorize("hasRole('PLATFORM_ADMIN')")
    public ResponseEntity<PlatformUser> toggleUserStatus(@PathVariable Long id) {
        PlatformUser user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + id));
        
        user.setIsActive(!Boolean.TRUE.equals(user.getIsActive()));
        return ResponseEntity.ok(userRepository.save(user));
    }
}