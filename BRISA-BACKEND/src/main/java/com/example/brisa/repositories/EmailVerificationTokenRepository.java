package com.example.brisa.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.brisa.models.auth.EmailVerificationToken;

import java.util.Optional;
import java.util.UUID;

public interface EmailVerificationTokenRepository extends JpaRepository<EmailVerificationToken, UUID> {
    Optional<EmailVerificationToken> findByToken(String token);
}
