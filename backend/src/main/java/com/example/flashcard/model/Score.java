package com.example.flashcard.model;

import jakarta.persistence.*;

@Entity
@Table(name = "scores")
public class Score {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int score;

    @ManyToOne
    @JoinColumn(name = "user_id") // link with user
    private User user;

    // getters & setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
}
