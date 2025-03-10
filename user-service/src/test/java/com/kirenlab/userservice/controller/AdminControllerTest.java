package com.kirenlab.userservice.controller;

import com.kirenlab.userservice.model.User;
import com.kirenlab.userservice.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import java.util.Arrays;
import java.util.List;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

public class AdminControllerTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private AdminController adminController;

    private MockMvc mockMvc;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(adminController).build();
    }

    @Test
    public void testGetAllUsers() {
        User user1 = new User();
        user1.setId(1L);
        user1.setUsername("John Doe");

        User user2 = new User();
        user2.setId(2L);
        user2.setUsername("Jane Doe");

        List<User> users = Arrays.asList(user1, user2);

        when(userRepository.findAll()).thenReturn(users);

        ResponseEntity<List<User>> response = adminController.getAllUsers();

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(2, response.getBody().size());
        assertEquals("John Doe", response.getBody().get(0).getUsername());
        assertEquals("Jane Doe", response.getBody().get(1).getUsername());
    }
}