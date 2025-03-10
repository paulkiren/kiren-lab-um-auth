package com.kirenlab.userservice.service;

import com.kirenlab.userservice.model.User;
import com.kirenlab.userservice.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;






class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        userService = new UserService(userRepository);
    }

    @Test
    void testGetAllUsers() {
        User user1 = new User();
        User user2 = new User();
        when(userRepository.findAll()).thenReturn(Arrays.asList(user1, user2));

        List<User> users = userService.getAllUsers();

        assertEquals(2, users.size());
        verify(userRepository, times(1)).findAll();
    }

    @Test
    void testGetUserById() {
        User user = new User();
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        Optional<User> foundUser = userService.getUserById(1L);

        assertTrue(foundUser.isPresent());
        assertEquals(user, foundUser.get());
        verify(userRepository, times(1)).findById(1L);
    }

    @Test
    void testRegisterUser() {
        User user = new User();
        user.setPassword("plainPassword");
        when(userRepository.save(any(User.class))).thenReturn(user);

        User registeredUser = userService.registerUser(user);

        assertNotNull(registeredUser);
        assertNotEquals("plainPassword", registeredUser.getPassword());
        verify(userRepository, times(1)).save(user);
    }

    @Test
    void testIsUsernameTaken() {
        when(userRepository.findByUsername("username")).thenReturn(Optional.of(new User()));

        boolean isTaken = userService.isUsernameTaken("username");

        assertTrue(isTaken);
        verify(userRepository, times(1)).findByUsername("username");
    }

    @Test
    void testIsEmailTaken() {
        when(userRepository.findByEmail("email@example.com")).thenReturn(Optional.of(new User()));

        boolean isTaken = userService.isEmailTaken("email@example.com");

        assertTrue(isTaken);
        verify(userRepository, times(1)).findByEmail("email@example.com");
    }
}