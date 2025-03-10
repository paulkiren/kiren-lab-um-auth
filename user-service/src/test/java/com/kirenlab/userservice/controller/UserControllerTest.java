package com.kirenlab.userservice.controller;

import com.kirenlab.userservice.model.User;
import com.kirenlab.userservice.service.UserService;
import com.kirenlab.userservice.repository.UserRepository;
import com.kirenlab.userservice.exception.UserNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class UserControllerTest {

    @Mock
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserController userController;

    private User user;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        user = new User(1L, "testuser", "password", "testuser@example.com", User.Role.USER);
    }

    @Test
    void testGetAllUsers() {
        List<User> users = Arrays.asList(user);
        when(userService.getAllUsers()).thenReturn(users);

        List<User> result = userController.getAllUsers();
        assertEquals(1, result.size());
        assertEquals("testuser", result.get(0).getUsername());
    }

    @Test
    void testGetUserById() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        ResponseEntity<User> response = userController.getUserById(1L);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("testuser", response.getBody().getUsername());
    }

    @Test
    void testGetUserByIdNotFound() {
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        try {
            userController.getUserById(1L);
        } catch (UserNotFoundException ex) {
            assertEquals("User with ID 1 not found", ex.getMessage());
        }
    }

    @Test
    void testRegisterUser() {
        Map<String, String> userData = new HashMap<>();
        userData.put("username", "newuser");
        userData.put("password", "newpassword");
        userData.put("email", "newuser@example.com");
        userData.put("role", "USER");

        when(userRepository.findByEmail("newuser@example.com")).thenReturn(Optional.empty());
        when(userRepository.findByUsername("newuser")).thenReturn(Optional.empty());

        ResponseEntity<String> response = userController.registerUser(userData);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("User registered successfully with role: USER", response.getBody());
    }

    @Test
    void testRegisterUserEmailExists() {
        Map<String, String> userData = new HashMap<>();
        userData.put("username", "newuser");
        userData.put("password", "newpassword");
        userData.put("email", "testuser@example.com");
        userData.put("role", "USER");

        when(userRepository.findByEmail("testuser@example.com")).thenReturn(Optional.of(user));

        ResponseEntity<String> response = userController.registerUser(userData);
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Email already exists", response.getBody());
    }

    @Test
    void testUpdateUser() {
        Map<String, String> updates = new HashMap<>();
        updates.put("email", "updated@example.com");

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        ResponseEntity<User> response = userController.updateUser(1L, updates);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("updated@example.com", response.getBody().getEmail());
    }

    @Test
    void testResetPassword() {
        Map<String, String> request = new HashMap<>();
        request.put("username", "testuser");
        request.put("newPassword", "newpassword");

        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(user));

        ResponseEntity<String> response = userController.resetPassword(request);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Password updated successfully", response.getBody());
    }

    @Test
    void testResetPasswordUserNotFound() {
        Map<String, String> request = new HashMap<>();
        request.put("username", "unknownuser");

        when(userRepository.findByUsername("unknownuser")).thenReturn(Optional.empty());

        try {
            userController.resetPassword(request);
        } catch (UserNotFoundException ex) {
            assertEquals("User with username unknownuser not found", ex.getMessage());
        }
    }
}
