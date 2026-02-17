package org.example.hackaton.messages.api.response;

import org.example.hackaton.messages.db.TypeMessage;

public record MessageDTO(
        Long id,
        TypeMessage type,
        String content
) {
}
