// package com.example.demo.service;

// import com.example.demo.dto.AuthRequestDto;
// import com.example.demo.dto.AuthResponseDto;
// import com.example.demo.dto.RegisterDto;
// import com.example.demo.entity.PlatformUser;
// import com.example.demo.exception.BusinessValidationException;
// import com.example.demo.exception.ResourceNotFoundException;
// import com.example.demo.repository.PlatformUserRepository;
// import com.example.demo.security.JwtService;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.stereotype.Service;

// @Service
// public class AuthService {

//     private final PlatformUserRepository repository;
//     private final PasswordEncoder passwordEncoder;
//     private final JwtService jwtService;
//     private final AuthenticationManager authenticationManager;

//     public AuthService(
//             PlatformUserRepository repository,
//             PasswordEncoder passwordEncoder,
//             JwtService jwtService,
//             AuthenticationManager authenticationManager) {

//         this.repository = repository;
//         this.passwordEncoder = passwordEncoder;
//         this.jwtService = jwtService;
//         this.authenticationManager = authenticationManager;
//     }

//     public AuthResponseDto register(RegisterDto request) {

//         if (repository.findByEmail(request.getEmail()).isPresent()) {
//             throw new BusinessValidationException("Email already exists.");
//         }

//         PlatformUser user = new PlatformUser();
//         user.setUsername(request.getFirstName() + " " + request.getLastName());
//         user.setEmail(request.getEmail());
//         user.setPassword(passwordEncoder.encode(request.getPassword()));

//         PlatformUser.Role role = PlatformUser.Role.USER;

//         if (request.getRole() != null && !request.getRole().isBlank()) {
//             try {
//                 role = PlatformUser.Role.valueOf(request.getRole().toUpperCase());
//             } catch (IllegalArgumentException e) {
//                 role = PlatformUser.Role.USER;
//             }
//         }

//         user.setRole(role);
//         user.setIsActive(true);

//         PlatformUser savedUser = repository.save(user);

//         String token = jwtService.generateToken(savedUser);

//         AuthResponseDto response = new AuthResponseDto();
//         response.setToken(token);
//         response.setRole(savedUser.getRole().name());
//         response.setUserId(savedUser.getId());

//         return response;
//     }

//     public AuthResponseDto login(AuthRequestDto request) {

//         authenticationManager.authenticate(
//                 new UsernamePasswordAuthenticationToken(
//                         request.getEmail(),
//                         request.getPassword()
//                 )
//         );

//         PlatformUser user = repository.findByEmail(request.getEmail())
//                 .orElseThrow(() ->
//                         new ResourceNotFoundException("User not found"));

//         if (!Boolean.TRUE.equals(user.getIsActive())) {
//             throw new BusinessValidationException("User account is disabled.");
//         }

//         String token = jwtService.generateToken(user);

//         AuthResponseDto response = new AuthResponseDto();
//         response.setToken(token);
//         response.setRole(user.getRole().name());
//         response.setUserId(user.getId());

//         return response;
//     }
// }

authservice
package com.example.demo.service;

import com.example.demo.dto.AuthRequestDto;
import com.example.demo.dto.AuthResponseDto;
import com.example.demo.dto.RegisterDto;
import com.example.demo.entity.PlatformUser;
import com.example.demo.entity.PlatformUser.Role;
import com.example.demo.exception.BusinessValidationException;
import com.example.demo.repository.PlatformUserRepository;
import com.example.demo.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final PlatformUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponseDto registerUser(RegisterDto request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BusinessValidationException("Email already registered");
        }

        PlatformUser user = PlatformUser.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.BRAND_MANAGER)
                .build();

        userRepository.save(user);

        String token = jwtService.generateToken(user);
        return AuthResponseDto.builder()
                .token(token)
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }

    public AuthResponseDto login(AuthRequestDto request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        PlatformUser user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BusinessValidationException("Invalid email or password"));

        String token = jwtService.generateToken(user);
        return AuthResponseDto.builder()
                .token(token)
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }
}