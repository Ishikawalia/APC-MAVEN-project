package com.example.flashcard.repository;

import com.example.flashcard.model.Flashcard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FlashcardRepository extends JpaRepository<Flashcard, Long> {
}
