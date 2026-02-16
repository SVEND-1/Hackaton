package org.example.todolist.tasks.api.dto.request;

import jakarta.validation.constraints.NotNull;

public record TaskUpdateDTO(
        @NotNull
        Long id,
        @NotNull
        String title,
        @NotNull
        String description
) {
}
