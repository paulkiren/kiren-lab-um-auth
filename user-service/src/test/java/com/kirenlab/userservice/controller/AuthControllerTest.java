package com.kirenlab.userservice.controller;
import com.kirenlab.userservice.service.AuthService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import java.util.Map;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;






public class AuthControllerTest {

    @Mock
    private AuthService authService;

    @InjectMocks
    private AuthController authController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testLogin() {
        // Arrange
        String username = "testUser";
        String password = "testPass";
        String token = "testToken";
        Map<String, String> credentials = Map.of("username", username, "password", password);

        when(authService.authenticate(anyString(), anyString())).thenReturn(token);

        // Act
        ResponseEntity<Map<String, String>> response = authController.login(credentials);

        // Assert
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(token, response.getBody().get("token"));
    }
}