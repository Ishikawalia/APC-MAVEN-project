package com.example.flashcard.controller;

import com.example.flashcard.model.Flashcard;
import com.example.flashcard.service.FlashcardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/flashcards")
public class FlashcardController {

    @Autowired
    private FlashcardService flashcardService;

    // Create a new flashcard
    @PostMapping
    public Flashcard createFlashcard(@RequestBody Flashcard flashcard) {
        return flashcardService.saveFlashcard(flashcard);
    }

    // Get all flashcards
    @GetMapping
    public List<Flashcard> getAllFlashcards() {
        return flashcardService.getAllFlashcards();
    }

    // Get flashcard by ID
    @GetMapping("/{id}")
    public Optional<Flashcard> getFlashcardById(@PathVariable Long id) {
        return flashcardService.getFlashcardById(id);
    }

    // Update flashcard
    @PutMapping("/{id}")
    public Flashcard updateFlashcard(@PathVariable Long id, @RequestBody Flashcard flashcard) {
        flashcard.setId(id);
        return flashcardService.saveFlashcard(flashcard);
    }

    // Delete flashcard
    @DeleteMapping("/{id}")
    public String deleteFlashcard(@PathVariable Long id) {
        flashcardService.deleteFlashcard(id);
        return "Flashcard with ID " + id + " deleted successfully.";
    }
}
