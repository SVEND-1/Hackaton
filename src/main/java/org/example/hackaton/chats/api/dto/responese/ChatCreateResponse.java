package org.example.hackaton.chats.api.dto.responese;

import java.time.LocalDateTime;

public record ChatCreateResponse(
        Long id,
        String name,
        LocalDateTime createAt
) {
}
