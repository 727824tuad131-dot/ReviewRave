// package com.example.demo.security;

// import com.example.demo.entity.PlatformUser;
// import com.example.demo.repository.PlatformUserRepository;
// import jakarta.servlet.FilterChain;
// import jakarta.servlet.ServletException;
// import jakarta.servlet.http.HttpServletRequest;
// import jakarta.servlet.http.HttpServletResponse;
// import org.springframework.lang.NonNull;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.context.SecurityContextHolder;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UsernameNotFoundException;
// import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
// import org.springframework.stereotype.Component;
// import org.springframework.web.filter.OncePerRequestFilter;

// import java.io.IOException;

// @Component
// public class JwtAuthenticationFilter extends OncePerRequestFilter {

//     private final JwtService jwtService;
//     private final PlatformUserRepository userRepository;

//     public JwtAuthenticationFilter(JwtService jwtService,
//                                    PlatformUserRepository userRepository) {
//         this.jwtService = jwtService;
//         this.userRepository = userRepository;
//     }

//     @Override
//     protected void doFilterInternal(
//             @NonNull HttpServletRequest request,
//             @NonNull HttpServletResponse response,
//             @NonNull FilterChain filterChain
//     ) throws ServletException, IOException {

//         final String authHeader = request.getHeader("Authorization");

//         if (authHeader == null || !authHeader.startsWith("Bearer ")) {
//             filterChain.doFilter(request, response);
//             return;
//         }

//         String jwt = authHeader.substring(7);
//         String userEmail = jwtService.extractUsername(jwt);

//         if (userEmail != null &&
//                 SecurityContextHolder.getContext().getAuthentication() == null) {

//             PlatformUser platformUser = userRepository.findByEmail(userEmail)
//                     .orElseThrow(() ->
//                             new UsernameNotFoundException("User not found"));

//             UserDetails userDetails = platformUser;

//             if (jwtService.isTokenValid(jwt, userDetails)) {

//                 UsernamePasswordAuthenticationToken authToken =
//                         new UsernamePasswordAuthenticationToken(
//                                 userDetails,
//                                 null,
//                                 userDetails.getAuthorities());

//                 authToken.setDetails(
//                         new WebAuthenticationDetailsSource()
//                                 .buildDetails(request));

//                 SecurityContextHolder.getContext()
//                         .setAuthentication(authToken);
//             }
//         }

//         filterChain.doFilter(request, response);
//     }
// }

package com.example.demo.security;

import com.example.demo.repository.PlatformUserRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;
    private final PlatformUserRepository platformUserRepository;


    // Password encoder
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    // Load users from MySQL database
    @Bean
    public UserDetailsService userDetailsService() {
        return username -> platformUserRepository.findByEmail(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException(
                                "User not found with email: " + username
                        )
                );
    }


    // Security configuration
    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http
                .csrf(csrf -> csrf.disable())

                .cors(cors ->
                        cors.configurationSource(corsConfigurationSource())
                )

                .authorizeHttpRequests(auth -> auth

                        // Login/Register
                        .requestMatchers("/api/auth/**").permitAll()

                        // Swagger
                        .requestMatchers(
                                "/swagger-ui/**",
                                "/swagger-ui.html",
                                "/v3/api-docs/**",
                                "/swagger-resources/**",
                                "/webjars/**"
                        ).permitAll()

                        // Everything else requires JWT
                        .anyRequest().authenticated()
                )

                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                .authenticationProvider(authenticationProvider)

                .addFilterBefore(
                        jwtAuthFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }


    // CORS
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration =
                new CorsConfiguration();

        configuration.setAllowedOrigins(
                List.of(
                        "http://localhost:3000",
                        "http://localhost:5173"
                )
        );

        configuration.setAllowedMethods(
                Arrays.asList(
                        "GET",
                        "POST",
                        "PUT",
                        "DELETE",
                        "OPTIONS"
                )
        );

        configuration.setAllowedHeaders(
                List.of("*")
        );

        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
                "/**",
                configuration
        );

        return source;
    }
}