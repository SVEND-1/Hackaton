package org.example.hackaton.agent.api.dto.response;

import org.example.hackaton.agent.db.Mood;
import org.example.hackaton.agent.db.Personality;

public record AgentProfileResponse(
        String name,
        String photo,
        Personality personality,
        Mood mood,
        String memory,
        String plan
){
}
