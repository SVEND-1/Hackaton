package org.example.todolist.users.api.dto.auth.response;

public record RegistrationResponse(
        boolean success,
        String message,
        String registrationId
) {
}
