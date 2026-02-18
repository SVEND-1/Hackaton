package org.example.hackaton.messages.api.response;

import java.time.LocalDateTime;

public record MessageSendResponse(
        Long id,
        String message,
        LocalDateTime created,
        Long agentId,
        Long chatId
) {
}
