package com.kirenlab.userservice.service;

import com.kirenlab.userservice.model.User;
import com.kirenlab.userservice.repository.UserRepository;
import com.kirenlab.userservice.utils.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.util.Collections;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;






class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private JwtUtil jwtUtil;

    @InjectMocks
    private AuthService authService;

    private BCryptPasswordEncoder passwordEncoder;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        passwordEncoder = new BCryptPasswordEncoder();
    }

    @Test
    void authenticate_UserNotFound() {
        String username = "testUser";
        String password = "testPassword";

        when(userRepository.findByUsername(username)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            authService.authenticate(username, password);
        });

        assertEquals("User not found", exception.getMessage());
    }

    @Test
    void authenticate_InvalidCredentials() {
        String username = "testUser";
        String password = "testPassword";
        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode("wrongPassword"));

        when(userRepository.findByUsername(username)).thenReturn(Optional.of(user));

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            authService.authenticate(username, password);
        });

        assertEquals("Invalid credentials", exception.getMessage());
    }

    @Test
    void authenticate_Success() {
        String username = "testUser";
        String password = "testPassword";
        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole(User.Role.USER);

        when(userRepository.findByUsername(username)).thenReturn(Optional.of(user));
        when(jwtUtil.generateToken(username, Collections.singletonList("USER"))).thenReturn("mockToken");

        String token = authService.authenticate(username, password);

        assertEquals("mockToken", token);
    }
}