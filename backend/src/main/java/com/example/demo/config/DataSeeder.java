
package com.example.demo.config;

import com.example.demo.entity.PlatformUser;
import com.example.demo.entity.PlatformUser.Role;
import com.example.demo.repository.PlatformUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class DataSeeder {

    private final PlatformUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    public CommandLineRunner seedData() {
        return args -> {
            seedUserIfAbsent("admin@platform.com", "admin123", Role.PLATFORM_ADMIN);
            seedUserIfAbsent("manager@brand.com", "manager123", Role.BRAND_MANAGER);
            seedUserIfAbsent("agent@resolve.com", "agent123", Role.RESOLUTION_AGENT);
        };
    }

    private void seedUserIfAbsent(String email, String rawPassword, Role role) {
        if (!userRepository.existsByEmail(email)) {
            PlatformUser user = PlatformUser.builder()
                    .email(email)
                    .password(passwordEncoder.encode(rawPassword))
                    .role(role)
                    .build();
            userRepository.save(user);
        }
    }
}