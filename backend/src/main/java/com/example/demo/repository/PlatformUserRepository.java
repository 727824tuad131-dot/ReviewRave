package com.example.demo.repository;

import com.example.demo.entity.PlatformUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PlatformUserRepository extends JpaRepository<PlatformUser, Long> {

    Optional<PlatformUser> findByUsername(String username);

    Optional<PlatformUser> findByEmail(String email);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);
}