package com.kirenlab.userservice.controller;

import com.kirenlab.userservice.model.User;
import com.kirenlab.userservice.service.UserService;
import com.kirenlab.userservice.repository.UserRepository;
import com.kirenlab.userservice.exception.UserNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Map;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User with ID " + id + " not found"));
        return ResponseEntity.ok(user);
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody Map<String, String> userData) {
        String username = userData.get("username");
        String password = userData.get("password");
        String email = userData.get("email");
        String role = userData.get("role").toUpperCase(); // Convert to uppercase
        Optional<User> existingUserByEmail = userRepository.findByEmail(email);
        if (existingUserByEmail.isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        Optional<User> existingUserByUsername = userRepository.findByUsername(username);
        if (existingUserByUsername.isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists");
        }

        User.Role userRole = User.Role.valueOf(role);

        User user = new User(null, username, passwordEncoder.encode(password), email, userRole);
        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully with role: " + role);
    }

    @PutMapping("/{id}")
public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody Map<String, String> updates) {
    User user = userRepository.findById(id)
            .orElseThrow(() -> new UserNotFoundException("User with ID " + id + " not found"));

    if (updates.containsKey("email")) {
        user.setEmail(updates.get("email"));
    }

    if (updates.containsKey("password")) {
        user.setPassword(new BCryptPasswordEncoder().encode(updates.get("password")));
    }

    userRepository.save(user);
    return ResponseEntity.ok(user);
}
@PostMapping("/reset-password")
public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> request) {
    String username = request.get("username");
    Optional<User> optionalUser = userRepository.findByUsername(username);

    if (optionalUser.isEmpty()) {
        throw new UserNotFoundException("User with username " + username + " not found");
    }

    User user = optionalUser.get();
    String newPassword = request.get("newPassword");
    user.setPassword(new BCryptPasswordEncoder().encode(newPassword));

    userRepository.save(user);
    return ResponseEntity.ok("Password updated successfully");
}


}
