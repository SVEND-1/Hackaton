package org.example.hackaton.agent.api.dto.response;

import org.example.hackaton.messages.api.response.MessageDTO;

import java.util.List;

public record AgentChatResponse(
        List<MessageDTO> messages,
        AgentDTO agentDTO
){
}
