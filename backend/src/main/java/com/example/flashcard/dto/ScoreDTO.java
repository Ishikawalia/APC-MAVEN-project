package com.example.flashcard.dto;

public class ScoreDTO {
    private Long userId;   // ✅ frontend se userId aayega
    private String username;
    private int score;

    public ScoreDTO() {}

    public ScoreDTO(Long userId, String username, int score) {
        this.userId = userId;
        this.username = username;
        this.score = score;
    }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }
}
