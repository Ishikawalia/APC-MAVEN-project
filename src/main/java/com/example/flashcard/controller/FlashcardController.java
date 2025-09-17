package com.example.flashcard.controller;

import com.example.flashcard.model.Flashcard;
import com.example.flashcard.service.FlashcardService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@Controller
public class FlashcardController {
    private final FlashcardService service;

    public FlashcardController(FlashcardService service) {
        this.service = service;
    }

    @GetMapping("/")
    public String index(Model model) {
        model.addAttribute("flashcards", service.getAll());
        return "index";
    }

    @GetMapping("/add")
    public String addForm(Model model) {
        model.addAttribute("flashcard", new Flashcard());
        return "add";
    }

    @PostMapping("/add")
    public String addSubmit(@ModelAttribute Flashcard flashcard) {
        service.save(flashcard);
        return "redirect:/";
    }

    @GetMapping("/delete/{id}")
    public String delete(@PathVariable Long id) {
        service.delete(id);
        return "redirect:/";
    }

    @GetMapping("/quiz")
    public String quiz(Model model) {
        List<Flashcard> flashcards = service.getAll();

        // Build shuffled options for each flashcard
        Map<Long, List<String>> optionsMap = new HashMap<>();
        for (Flashcard f : flashcards) {
            List<String> opts = new ArrayList<>();
            if (f.getAnswer() != null) opts.add(f.getAnswer());
            if (f.getOption1() != null) opts.add(f.getOption1());
            if (f.getOption2() != null) opts.add(f.getOption2());
            if (f.getOption3() != null) opts.add(f.getOption3());

            Collections.shuffle(opts);
            optionsMap.put(f.getId(), opts);
        }

        model.addAttribute("flashcards", flashcards);
        model.addAttribute("optionsMap", optionsMap);
        return "quiz";
    }

    @GetMapping("/edit/{id}")
    public String editForm(@PathVariable Long id, Model model) {
        Flashcard flashcard = service.findById(id);
        model.addAttribute("flashcard", flashcard);
        return "edit";
    }

    @PostMapping("/edit/{id}")
    public String editSubmit(@PathVariable Long id, @ModelAttribute Flashcard flashcard) {
        Flashcard existing = service.findById(id);
        if (existing != null) {
            existing.setQuestion(flashcard.getQuestion());
            existing.setAnswer(flashcard.getAnswer());
            existing.setOption1(flashcard.getOption1());
            existing.setOption2(flashcard.getOption2());
            existing.setOption3(flashcard.getOption3());
            service.save(existing);
        }
        return "redirect:/";
    }
}
