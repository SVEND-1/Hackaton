package org.example.todolist.tasks.api.dto.request;

import jakarta.validation.constraints.NotNull;

public record TaskCreateDTO(
        @NotNull
        String title,
        @NotNull
        String description
) {
}
