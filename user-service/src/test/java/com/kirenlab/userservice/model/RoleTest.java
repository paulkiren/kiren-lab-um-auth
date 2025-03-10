package com.kirenlab.userservice.model;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;



public class RoleTest {

    @Test
    public void testRoleUser() {
        Role role = Role.USER;
        assertEquals(Role.USER, role);
    }

    @Test
    public void testRoleAdmin() {
        Role role = Role.ADMIN;
        assertEquals(Role.ADMIN, role);
    }

    @Test
    public void testRoleValues() {
        Role[] roles = Role.values();
        assertArrayEquals(new Role[]{Role.USER, Role.ADMIN}, roles);
    }

    @Test
    public void testRoleValueOf() {
        Role userRole = Role.valueOf("USER");
        Role adminRole = Role.valueOf("ADMIN");
        assertEquals(Role.USER, userRole);
        assertEquals(Role.ADMIN, adminRole);
    }
}