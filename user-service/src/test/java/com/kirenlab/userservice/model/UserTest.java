package com.kirenlab.userservice.model;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;




public class UserTest {

    @Test
    public void testUserConstructorAndGetters() {
        User user = new User(1L, "testuser", "password123", "testuser@example.com", User.Role.USER);

        assertEquals(1L, user.getId());
        assertEquals("testuser", user.getUsername());
        assertEquals("password123", user.getPassword());
        assertEquals("testuser@example.com", user.getEmail());
        assertEquals(User.Role.USER, user.getRole());
    }

    @Test
    public void testUserSetters() {
        User user = new User();
        user.setId(1L);
        user.setUsername("testuser");
        user.setPassword("password123");
        user.setEmail("testuser@example.com");
        user.setRole(User.Role.ADMIN);

        assertEquals(1L, user.getId());
        assertEquals("testuser", user.getUsername());
        assertEquals("password123", user.getPassword());
        assertEquals("testuser@example.com", user.getEmail());
        assertEquals(User.Role.ADMIN, user.getRole());
    }

    @Test
    public void testUserRoleEnum() {
        assertEquals("USER", User.Role.USER.name());
        assertEquals("ADMIN", User.Role.ADMIN.name());
    }
}