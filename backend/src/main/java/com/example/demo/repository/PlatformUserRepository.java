package com.example.demo.repository;

import com.example.demo.entity.PlatformUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PlatformUserRepository extends JpaRepository<PlatformUser, Long> {
    
    /**
     * Fetches user details by email.
     */
    Optional<PlatformUser> findByEmail(String email);
}