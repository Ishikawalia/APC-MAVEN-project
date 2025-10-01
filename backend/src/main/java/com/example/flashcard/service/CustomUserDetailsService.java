package com.example.flashcard.service;

import com.example.flashcard.model.User;
import com.example.flashcard.repository.UserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    // ✅ Constructor injection
    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // ✅ Database se user find karo
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));

        // ✅ Return Spring Security User object with username, password and role
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                Collections.singletonList(
                        new SimpleGrantedAuthority("ROLE_" + user.getRole().toUpperCase()) // e.g. ROLE_ADMIN / ROLE_USER
                )
        );
    }
}
