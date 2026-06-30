package com.example.demo.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.entity.PlatformUser;

public interface PlatformUserRepository extends JpaRepository<PlatformUser, Long> {

    Optional<PlatformUser> findByEmail(String email);

    boolean existsByEmail(String email);

    Optional<PlatformUser> findByUsername(String username);

    boolean existsByUsername(String username);
}