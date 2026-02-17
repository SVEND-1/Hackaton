package org.example.hackaton.chats.api.dto.responese;

import org.example.hackaton.agent.api.dto.response.AgentChatResponse;

import java.util.List;

public record ChatResponse(
        String name,
        AgentChatResponse agentChatResponse1,
        AgentChatResponse agentChatResponse2
) {
}
