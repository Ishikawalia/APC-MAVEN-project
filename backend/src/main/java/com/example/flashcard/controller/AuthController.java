package com.example.flashcard.controller;

import com.example.flashcard.dto.UserDTO;
import com.example.flashcard.model.User;
import com.example.flashcard.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // React frontend allow
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<UserDTO> signup(@RequestBody User user) {
        User saved = userService.registerUser(user);
        return ResponseEntity.ok(new UserDTO(
                saved.getId(),
                saved.getUsername(),
                saved.getRole()
        ));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginData) {
        Optional<User> user = userService.loginUser(loginData.getEmail(), loginData.getPassword());

        if (user.isPresent()) {
            User u = user.get();
            return ResponseEntity.ok(new UserDTO(
                    u.getId(),
                    u.getUsername(),
                    u.getRole()
            ));
        } else {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
    }
}
