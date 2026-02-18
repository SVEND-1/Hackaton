package org.example.hackaton.chats.api.dto.responese;

import java.time.LocalDateTime;
import java.util.List;

public record ChatDTO(
        Long id,
        String name,
        List<String> messages,
        LocalDateTime createAt
) {
}
