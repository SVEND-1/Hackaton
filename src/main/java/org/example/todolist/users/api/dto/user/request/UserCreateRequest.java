package org.example.todolist.users.api.dto.user.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

public record UserCreateRequest(
        @NotNull
        String name,
        @NotNull
        @Email
        String email,
        @NotNull
        String password
) {
}
