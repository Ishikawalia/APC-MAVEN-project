package com.example.flashcard.controller;

import com.example.flashcard.dto.ScoreDTO;
import com.example.flashcard.model.Score;
import com.example.flashcard.model.User;
import com.example.flashcard.repository.ScoreRepository;
import com.example.flashcard.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/scores")
@CrossOrigin(origins = "http://localhost:3000") // ✅ allow React frontend
public class ScoreController {

    private final ScoreRepository scoreRepo;
    private final UserRepository userRepo;

    public ScoreController(ScoreRepository scoreRepo, UserRepository userRepo) {
        this.scoreRepo = scoreRepo;
        this.userRepo = userRepo;
    }

    // ✅ Get all scores
    @GetMapping
    public List<ScoreDTO> getAllScores() {
        return scoreRepo.findAll().stream()
                .map(s -> new ScoreDTO(
                        s.getUser().getId(),        // userId
                        s.getUser().getUsername(),  // username
                        s.getScore()                // score
                ))
                .toList();
    }

    // ✅ Save score (accept JSON body)
    @PostMapping
    public ResponseEntity<ScoreDTO> saveScore(@RequestBody ScoreDTO scoreDTO) {
        System.out.println("📥 Saving score request: userId=" + scoreDTO.getUserId() + " score=" + scoreDTO.getScore());

        User user = userRepo.findById(scoreDTO.getUserId()).orElse(null);
        if (user == null) {
            System.out.println("❌ User not found with ID: " + scoreDTO.getUserId());
            return ResponseEntity.badRequest().build();
        }

        Score newScore = new Score();
        newScore.setScore(scoreDTO.getScore());
        newScore.setUser(user);

        Score saved = scoreRepo.save(newScore);

        System.out.println("✅ Saved score: " + saved.getScore() + " for user " + saved.getUser().getUsername());

        return ResponseEntity.ok(new ScoreDTO(
                saved.getUser().getId(),
                saved.getUser().getUsername(),
                saved.getScore()
        ));
    }

    // ✅ Delete score
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteScore(@PathVariable Long id) {
        if (scoreRepo.existsById(id)) {
            scoreRepo.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
