package org.example.hackaton.agent.domain;

import org.example.hackaton.agent.api.dto.response.AgentDTO;
import org.example.hackaton.agent.db.AgentEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;


@Mapper(componentModel = "spring")
public interface AgentMapper {

    @Mapping(source = "name", target = "name")
    @Mapping(source = "personality", target = "personality")
    @Mapping(source = "mood", target = "mood")
    @Mapping(target = "photo", ignore = true)
    @Mapping(target = "type", ignore = true)
    AgentDTO convertEntityToDTO(AgentEntity entity);

    @Mapping(source = "name", target = "name")
    @Mapping(source = "personality", target = "personality")
    @Mapping(source = "mood", target = "mood")
    @Mapping(target = "photo", ignore = true)
    AgentEntity convertDTOToEntity(AgentDTO dto);
}
