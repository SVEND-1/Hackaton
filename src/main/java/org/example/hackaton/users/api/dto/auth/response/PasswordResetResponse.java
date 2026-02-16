package org.example.hackaton.users.api.dto.auth.response;

public record PasswordResetResponse(
        boolean success,
        String message,
        String resetId
) {
}
