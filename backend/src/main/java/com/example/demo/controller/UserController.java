package com.example.demo.controller;

import com.example.demo.entity.PlatformUser;
import com.example.demo.repository.PlatformUserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private PlatformUserRepository platformUserRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Create User
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PlatformUser> createUser(
            @Valid @RequestBody PlatformUser user) {

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return ResponseEntity.ok(platformUserRepository.save(user));
    }

    // Get All Users
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<PlatformUser>> getAllUsers() {

        return ResponseEntity.ok(platformUserRepository.findAll());
    }

    // Get User By Id
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PlatformUser> getUserById(@PathVariable Long id) {

        return platformUserRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update User
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<PlatformUser> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody PlatformUser user) {

        return platformUserRepository.findById(id)
                .map(existingUser -> {
                    existingUser.setUsername(user.getUsername());
                    existingUser.setEmail(user.getEmail());

                    if (user.getPassword() != null && !user.getPassword().isBlank()) {
                        existingUser.setPassword(
                                passwordEncoder.encode(user.getPassword()));
                    }

                    existingUser.setRole(user.getRole());

                    return ResponseEntity.ok(
                            platformUserRepository.save(existingUser));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete User
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {

        if (!platformUserRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        platformUserRepository.deleteById(id);
        return ResponseEntity.ok("User deleted successfully");
    }
}