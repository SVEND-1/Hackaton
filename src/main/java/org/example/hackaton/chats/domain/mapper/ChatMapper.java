package org.example.hackaton.chats.domain.mapper;

import org.example.hackaton.agent.api.dto.response.AgentChatResponse;
import org.example.hackaton.agent.db.AgentEntity;
import org.example.hackaton.agent.domain.AgentChatResponseMapper;
import org.example.hackaton.chats.api.dto.responese.ChatDTO;
import org.example.hackaton.chats.api.dto.responese.ChatResponse;
import org.example.hackaton.chats.db.ChatEntity;
import org.example.hackaton.messages.db.MessageEntity;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;

@Component
public class ChatMapper {

    private final AgentChatResponseMapper agentChatResponseMapper;

    public ChatMapper(AgentChatResponseMapper agentChatResponseMapper) {
        this.agentChatResponseMapper = agentChatResponseMapper;
    }

    public ChatResponse convertEntityToDTOResponse(ChatEntity chatEntity) {
        if (chatEntity == null) return null;

        Set<AgentEntity> agents = chatEntity.getAgents();
        AgentChatResponse agent1 = null;
        AgentChatResponse agent2 = null;

        if (agents != null && !agents.isEmpty()) {
            List<AgentEntity> agentList = agents.stream().toList();

            agent1 = agentChatResponseMapper.convertEntityToDTO(agentList.get(0));

            if (agentList.size() > 1) {
                agent2 = agentChatResponseMapper.convertEntityToDTO(agentList.get(1));
            }
        }

        return new ChatResponse(
                chatEntity.getName(),
                agent1,
                agent2
        );
    }


    public ChatDTO convertEntityToDTO(ChatEntity chatEntity) {
        if (chatEntity == null) return null;

        List<String>  messages = chatEntity.getMessages()
                .stream()
                .map(MessageEntity::getContent)
                .toList();
        return new ChatDTO(
                chatEntity.getId(),
                chatEntity.getName(),
                messages,
                chatEntity.getCreatedAt()
        );
    }
}