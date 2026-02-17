package org.example.hackaton.agent.api.dto.response;

import org.example.hackaton.agent.db.Mood;
import org.example.hackaton.agent.db.Personality;
import org.example.hackaton.messages.db.TypeMessage;
import org.springframework.web.multipart.MultipartFile;


public record AgentDTO(
        String name,
        MultipartFile photo,
        TypeMessage type,
        Personality personality,
        Mood mood
) {
}
