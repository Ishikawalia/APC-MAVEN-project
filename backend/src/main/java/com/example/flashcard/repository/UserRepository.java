package com.example.flashcard.repository;

import com.example.flashcard.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);  // login by username
    Optional<User> findByEmail(String email);        // ✅ login by email
}
