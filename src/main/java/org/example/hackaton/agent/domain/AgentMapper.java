package org.example.hackaton.agent.domain;

import org.example.hackaton.agent.api.dto.response.AgentChatResponse;
import org.example.hackaton.agent.api.dto.response.AgentDTO;
import org.example.hackaton.agent.db.AgentEntity;
import org.example.hackaton.messages.api.response.MessageDTO;
import org.example.hackaton.messages.domain.mapper.MessageMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface AgentMapper {

    @Mapping(source = "name", target = "name")
    @Mapping(source = "photo", target = "photo")
    @Mapping(source = "personality", target = "personality")
    @Mapping(source = "mood", target = "mood")
    @Mapping(target = "type", ignore = true) // type нет в AgentEntity
    AgentDTO convertEntityToDTO(AgentEntity entity);

    // Обратное преобразование (если нужно)
    @Mapping(source = "name", target = "name")
    @Mapping(source = "photo", target = "photo")
    @Mapping(source = "personality", target = "personality")
    @Mapping(source = "mood", target = "mood")
    AgentEntity convertDTOToEntity(AgentDTO dto);
}
