package org.example.hackaton.chats.api.dto.request;

import org.example.hackaton.agent.api.dto.response.AgentDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.Set;

public record CreateChatRequest(
        String name,
        Set<AgentDTO> agents
) {
}
