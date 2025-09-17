package com.example.flashcard.service;

import com.example.flashcard.model.Flashcard;
import com.example.flashcard.repository.FlashcardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FlashcardService {

    @Autowired
    private FlashcardRepository flashcardRepository;

    // Create or Update Flashcard
    public Flashcard saveFlashcard(Flashcard flashcard) {
        return flashcardRepository.save(flashcard);
    }

    // Get all flashcards
    public List<Flashcard> getAllFlashcards() {
        return flashcardRepository.findAll();
    }

    // Get Flashcard by ID
    public Optional<Flashcard> getFlashcardById(Long id) {
        return flashcardRepository.findById(id);
    }

    // Delete Flashcard by ID
    public void deleteFlashcard(Long id) {
        flashcardRepository.deleteById(id);
    }
}
