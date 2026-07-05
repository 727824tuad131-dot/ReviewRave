package com.example.demo.controller;

import com.example.demo.entity.PlatformUser;
import com.example.demo.repository.PlatformUserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private PlatformUserRepository platformUserRepository;

    // Create User
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public PlatformUser createUser(@Valid @RequestBody PlatformUser user) {
        return platformUserRepository.save(user);
    }

    // Get All Users
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<PlatformUser> getAllUsers() {
        return platformUserRepository.findAll();
    }

    // Get User By Id
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public PlatformUser getUserById(@PathVariable Long id) {
        return platformUserRepository.findById(id).orElse(null);
    }

    // Update User
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public PlatformUser updateUser(@PathVariable Long id,
                                   @Valid @RequestBody PlatformUser user) {
        if (platformUserRepository.existsById(id)) {
            user.setId(id); // Requires setId(Long) in PlatformUser
            return platformUserRepository.save(user);
        }
        return null;
    }

    // Delete User
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteUser(@PathVariable Long id) {
        platformUserRepository.deleteById(id);
        return "User deleted successfully";
    }
}