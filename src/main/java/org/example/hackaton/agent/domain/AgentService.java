package org.example.hackaton.agent.domain;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.example.hackaton.agent.api.dto.request.AgentCreateRequest;
import org.example.hackaton.agent.api.dto.response.AgentChatResponse;
import org.example.hackaton.agent.api.dto.response.AgentDTO;
import org.example.hackaton.agent.db.*;
import org.example.hackaton.messages.api.response.MessageDTO;
import org.example.hackaton.messages.domain.mapper.MessageMapper;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AgentService {//TODO НАПИСАТЬ изменения характера и настроение
    private final ChatClient chatClient;
    private final AgentRepository agentRepository;
    private final MessageMapper messageMapper;
    private final AgentMapper agentMapper;

    public AgentEntity getAgent(Long agentId) {
        return agentRepository.findById(agentId).orElseThrow(() -> new EntityNotFoundException("Agent не найден"));
    }

    public AgentEntity changeMood(Long agentId, Mood mood) {
        AgentEntity agentEntity = getAgent(agentId);
        agentEntity.setMood(mood);
        return agentRepository.save(agentEntity);
    }

    public AgentEntity changePersonality(Long agentId, Personality personality) {
        AgentEntity agentEntity = getAgent(agentId);
        agentEntity.setPersonality(personality);
        return agentRepository.save(agentEntity);
    }
}