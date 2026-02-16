package org.example.todolist.tasks.api.dto.response;

public record TaskDTO(
        Long id,
        String title,
        String description,
        Boolean completed
) {
}
