package com.example.flashcard.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "flashcards")
public class Flashcard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String question;

    private String answer;

    @ElementCollection
    @CollectionTable(
            name = "flashcard_options",
            joinColumns = @JoinColumn(name = "flashcard_id")
    )
    @Column(name = "option_text")
    private List<String> options;

    // --- Getters & Setters ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getQuestion() { return question; }
    public void setQuestion(String question) { this.question = question; }

    public String getAnswer() { return answer; }
    public void setAnswer(String answer) { this.answer = answer; }

    public List<String> getOptions() { return options; }
    public void setOptions(List<String> options) { this.options = options; }
}
