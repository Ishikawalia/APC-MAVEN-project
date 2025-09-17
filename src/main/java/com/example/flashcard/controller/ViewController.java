package com.example.flashcard.controller;

import com.example.flashcard.model.Flashcard;
import com.example.flashcard.service.FlashcardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class ViewController {

    @Autowired
    private FlashcardService flashcardService;

    @GetMapping("/")
    public String home(Model model) {
        List<Flashcard> flashcards = flashcardService.getAllFlashcards();
        model.addAttribute("flashcards", flashcards);
        model.addAttribute("flashcard", new Flashcard()); // for form
        return "index"; // loads index.html
    }
}
