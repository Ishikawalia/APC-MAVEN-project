package com.example.flashcard.controller;

import com.example.flashcard.model.Flashcard;
import com.example.flashcard.repository.FlashcardRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/flashcards")
@CrossOrigin(origins = "http://localhost:3000") // ✅ allow frontend React
public class FlashcardController {

    private final FlashcardRepository repo;

    public FlashcardController(FlashcardRepository repo) {
        this.repo = repo;
    }

    // ✅ Get all flashcards
    @GetMapping
    public ResponseEntity<List<Flashcard>> getAll() {
        return ResponseEntity.ok(repo.findAll());
    }

    // ✅ Get quiz (random 5 questions)
    @GetMapping("/quiz")
    public ResponseEntity<List<Flashcard>> getQuiz() {
        List<Flashcard> all = repo.findAll();
        if (all.isEmpty()) {
            return ResponseEntity.ok(Collections.emptyList());
        }
        Collections.shuffle(all); // randomize order
        return ResponseEntity.ok(all.stream().limit(5).toList()); // return max 5
    }

    // ✅ Get single flashcard by ID
    @GetMapping("/{id}")
    public ResponseEntity<Flashcard> getFlashcardById(@PathVariable Long id) {
        return repo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ Add a new flashcard
    @PostMapping
    public ResponseEntity<Flashcard> addFlashcard(@RequestBody Flashcard flashcard) {
        System.out.println("📥 Received in backend:");
        System.out.println("Question: " + flashcard.getQuestion());
        System.out.println("Answer: " + flashcard.getAnswer());
        System.out.println("Options: " + flashcard.getOptions());

        Flashcard saved = repo.save(flashcard);
        return ResponseEntity.ok(saved);
    }

    // ✅ Update flashcard
    @PutMapping("/{id}")
    public ResponseEntity<Flashcard> updateFlashcard(@PathVariable Long id, @RequestBody Flashcard updated) {
        return repo.findById(id)
                .map(existing -> {
                    existing.setQuestion(updated.getQuestion());
                    existing.setAnswer(updated.getAnswer());
                    existing.setOptions(updated.getOptions());
                    return ResponseEntity.ok(repo.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ Delete flashcard
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFlashcard(@PathVariable Long id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return ResponseEntity.noContent().build(); // 204
        }
        return ResponseEntity.notFound().build();
    }
}
