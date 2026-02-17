package org.example.hackaton.agent.domain;

import org.example.hackaton.agent.api.dto.response.AgentDTO;
import org.example.hackaton.agent.db.AgentEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AgentMapper {
    AgentDTO converterEntityToDTO(AgentEntity agent);
    AgentEntity converterDTOToEntity(AgentDTO agentDTO);
}
