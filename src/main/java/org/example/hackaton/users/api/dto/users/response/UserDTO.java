package org.example.hackaton.users.api.dto.users.response;


import org.example.hackaton.users.db.Role;

public record UserDTO(
        Long id,
        String name,
        String email,
        String password,
        Role role
) {
}
