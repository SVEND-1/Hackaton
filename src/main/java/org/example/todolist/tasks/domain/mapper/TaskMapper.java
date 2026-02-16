package org.example.todolist.tasks.domain.mapper;

import org.example.todolist.tasks.api.dto.response.TaskDTO;
import org.example.todolist.tasks.db.TaskEntity;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TaskMapper {
    TaskDTO convertEntityToDto(TaskEntity task);
    List<TaskDTO> convertEntityToDto(List<TaskEntity> tasks);
}
