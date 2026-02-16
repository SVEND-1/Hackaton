package org.example.todolist.users.domain.mapper;

import org.example.todolist.users.api.dto.user.request.UserCreateRequest;
import org.example.todolist.users.api.dto.user.response.UserDTO;
import org.example.todolist.users.db.UserEntity;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDTO convertEntityToDto(UserEntity user);

    UserCreateRequest convertDtoToCreateRequest(UserEntity user);
}
