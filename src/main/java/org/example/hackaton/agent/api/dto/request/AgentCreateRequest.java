package org.example.hackaton.agent.api.dto.request;

import org.example.hackaton.agent.db.Mood;
import org.example.hackaton.agent.db.Personality;
import org.springframework.web.multipart.MultipartFile;

public record AgentCreateRequest(
        String name,
        MultipartFile file,
        Personality personality,
        Mood mood
) {
}
