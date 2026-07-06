package com.example.demo.controller;

import com.example.demo.entity.PlatformUser;
import com.example.demo.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthService authService;

    // Register User
    @PostMapping("/register")
    public ResponseEntity<PlatformUser> register(
            @RequestBody PlatformUser user) {

        return ResponseEntity.ok(authService.register(user));
    }

    // Login User
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(
            @RequestBody PlatformUser user) {

        String token = authService.login(
                user.getUsername(),
                user.getPassword());

        Map<String, String> response = new HashMap<>();
        response.put("token", token);

        return ResponseEntity.ok(response);
    }
}