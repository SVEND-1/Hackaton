package org.example.todolist.web;

import java.time.LocalDateTime;

public record ErrorResponse(
        String message,
        String errorMessage,
        LocalDateTime errorTime
) {
}
