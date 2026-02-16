package org.example.hackaton.users.domain.mapper;

import org.example.hackaton.users.api.dto.users.request.UserCreateRequest;
import org.example.hackaton.users.api.dto.users.response.UserDTO;
import org.example.hackaton.users.db.UserEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDTO convertEntityToDto(UserEntity user);

    UserCreateRequest convertDtoToCreateRequest(UserEntity user);
}
