package com.example.flashcard.service;

import com.example.flashcard.model.Flashcard;
import com.example.flashcard.repository.FlashcardRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FlashcardService {
    private final FlashcardRepository repo;

    public FlashcardService(FlashcardRepository repo) {
        this.repo = repo;
    }

    public List<Flashcard> getAll() {
        return repo.findAll();
    }

    public Flashcard save(Flashcard flashcard) {
        return repo.save(flashcard);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
    public Flashcard findById(Long id) {
        return repo.findById(id).orElse(null);
    }

}
