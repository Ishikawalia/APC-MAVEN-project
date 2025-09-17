package com.example.flashcard;

import com.example.flashcard.model.Flashcard;
import com.example.flashcard.repository.FlashcardRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class FlashcardStudyProjectMavenApplication {

    public static void main(String[] args) {
        SpringApplication.run(FlashcardStudyProjectMavenApplication.class, args);
    }

    // Preload some flashcards on startup
    @Bean
    CommandLineRunner initDatabase(FlashcardRepository repo) {
        return args -> {
            repo.save(new Flashcard(
                    null,
                    "What is Java?",
                    "A programming language",   // ✅ Correct Answer
                    "Coffee",                   // ❌ Wrong Option
                    "An operating system",      // ❌ Wrong Option
                    "A database"                // ❌ Wrong Option
            ));

            repo.save(new Flashcard(
                    null,
                    "What is Spring Boot?",
                    "A framework for building Java applications", // ✅ Correct Answer
                    "A web server",                               // ❌ Wrong Option
                    "A testing library",                          // ❌ Wrong Option
                    "A database tool"                             // ❌ Wrong Option
            ));

            repo.save(new Flashcard(
                    null,
                    "What does JPA stand for?",
                    "Java Persistence API",     // ✅ Correct Answer
                    "Java Program Adapter",     // ❌ Wrong Option
                    "Java Platform Architecture", // ❌ Wrong Option
                    "Java Process Application"  // ❌ Wrong Option
            ));
        };
    }
}
