package org.example.todolist.users.api.dto.auth.response;

public record LoginResponse(
        boolean success,
        String message,
        String redirectUrl) {
}
