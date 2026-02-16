package org.example.todolist.users.api.dto.auth.response;

public record SimpleResponse(
        boolean success,
        String message
) {
}
