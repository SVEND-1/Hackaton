package org.example.hackaton.messages.domain.mapper;

import org.example.hackaton.messages.api.response.MessageDTO;
import org.example.hackaton.messages.db.MessageEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface MessageMapper {
    @Mapping(source = "id", target = "id")
    @Mapping(source = "type", target = "type")
    @Mapping(source = "content", target = "content")
    MessageDTO convertEntityToDTO(MessageEntity entity);

    @Mapping(source = "id", target = "id")
    @Mapping(source = "type", target = "type")
    @Mapping(source = "content", target = "content")
    MessageEntity convertDTOToEntity(MessageDTO dto);
}