package org.example.hackaton.agent.api.dto.response;

import org.example.hackaton.agent.db.Personality;

public record AgentUpdatePersonality(
        Long id,
        Personality updatePersonality
) {
}
