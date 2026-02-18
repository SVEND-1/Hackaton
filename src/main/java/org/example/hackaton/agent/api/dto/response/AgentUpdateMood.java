package org.example.hackaton.agent.api.dto.response;

import org.example.hackaton.agent.db.Mood;

public record AgentUpdateMood(
        Long id,
        Mood updateMood
) {
}
