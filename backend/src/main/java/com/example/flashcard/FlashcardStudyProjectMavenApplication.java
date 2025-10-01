package com.example.flashcard;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan(basePackages = "com.example.flashcard.model")              // ✅ Entities scan
@EnableJpaRepositories(basePackages = "com.example.flashcard.repository") // ✅ Repositories scan
public class FlashcardStudyProjectMavenApplication {
    public static void main(String[] args) {
        SpringApplication.run(FlashcardStudyProjectMavenApplication.class, args);
    }
}
