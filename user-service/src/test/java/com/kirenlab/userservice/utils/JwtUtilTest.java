package com.kirenlab.userservice.utils;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;






public class JwtUtilTest {

    private JwtUtil jwtUtil;
    private String token;
    private final String username = "testUser";
    private final List<String> roles = Arrays.asList("ROLE_USER", "ROLE_ADMIN");

    @BeforeEach
    public void setUp() {
        jwtUtil = new JwtUtil();
        token = jwtUtil.generateToken(username, roles);
    }

    @Test
    public void testGenerateToken() {
        assertNotNull(token);
        String extractedUsername = Jwts.parser()
                .setSigningKey("secret")
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
        assertEquals(username, extractedUsername);
    }

    @Test
    public void testExtractUsername() {
        String extractedUsername = jwtUtil.extractUsername(token);
        assertEquals(username, extractedUsername);
    }

    @Test
    public void testExtractRoles() {
        List<String> extractedRoles = jwtUtil.extractRoles(token);
        assertEquals(roles, extractedRoles);
    }
}