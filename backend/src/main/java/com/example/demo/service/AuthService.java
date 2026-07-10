package com.example.demo.service;

import com.example.demo.entity.PlatformUser;
import com.example.demo.repository.PlatformUserRepository;
import com.example.demo.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.demo.dto.*; 
import com.example.demo.exception.BusinessValidationException;
import com.example.demo.exception.ResourceNotFoundException;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final PlatformUserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService; 
    private final AuthenticationManager authenticationManager;

    public AuthResponseDto register(RegisterDto request) {
        if (repository.findByEmail(request.getEmail()).isPresent()) {
            throw new BusinessValidationException("Username/Email is already taken.");
        }

        PlatformUser.Role parsedRole;
        try {
            parsedRole = PlatformUser.Role.valueOf(request.getRole().toUpperCase());
        } catch (Exception e) {
            parsedRole = PlatformUser.Role.BRAND_MANAGER; // Default fallback safety assignment
        }

        // Ensured all standard profile payload properties match your PlatformUser entity structural fields
        PlatformUser newUser = PlatformUser.builder()
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .role(parsedRole)
                .isActive(true)
                .build();

        PlatformUser savedUser = repository.save(newUser);
        String token = jwtService.generateToken(savedUser);

        return new AuthResponseDto(token, savedUser.getRole().name(), savedUser.getId());
    }

    public AuthResponseDto login(AuthRequestDto request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        PlatformUser user = repository.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found."));

        if (!Boolean.TRUE.equals(user.getIsActive())) {
            throw new BusinessValidationException("User account is disabled.");
        }

        String token = jwtService.generateToken(user);
        return new AuthResponseDto(token, user.getRole().name(), user.getId());
    }
}