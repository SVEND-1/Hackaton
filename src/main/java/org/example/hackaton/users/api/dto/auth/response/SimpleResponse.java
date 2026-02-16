package org.example.hackaton.users.api.dto.auth.response;

public record SimpleResponse(
        boolean success,
        String message
) {
}
