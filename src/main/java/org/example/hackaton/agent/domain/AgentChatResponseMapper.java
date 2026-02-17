package org.example.hackaton.agent.domain;

import org.example.hackaton.agent.api.dto.response.AgentChatResponse;
import org.example.hackaton.agent.db.AgentEntity;
import org.example.hackaton.messages.api.response.MessageDTO;
import org.example.hackaton.messages.domain.mapper.MessageMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public abstract class AgentChatResponseMapper {

    @Autowired
    protected MessageMapper messageMapper;

    @Autowired
    protected AgentMapper agentMapper;

    @Mapping(target = "messages", expression = "java(convertMessagesToDTO(agent))")
    @Mapping(target = "agentDTO", expression = "java(agentMapper.convertEntityToDTO(agent))")
    public abstract AgentChatResponse convertEntityToDTO(AgentEntity agent);

    protected List<MessageDTO> convertMessagesToDTO(AgentEntity agent) {
        if (agent == null || agent.getMessage() == null) return null;

        return agent.getMessage().stream()
                .map(messageMapper::convertEntityToDTO)
                .collect(Collectors.toList());
    }
}