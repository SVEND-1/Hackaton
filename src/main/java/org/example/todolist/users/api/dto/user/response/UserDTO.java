package org.example.todolist.users.api.dto.user.response;

import org.example.todolist.users.db.Role;

public record UserDTO(
        Long id,
        String name,
        String email,
        String password,
        Role role
) {
}
