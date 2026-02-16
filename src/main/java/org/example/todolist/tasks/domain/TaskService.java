package org.example.todolist.tasks.domain;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.todolist.tasks.api.dto.request.TaskCreateDTO;
import org.example.todolist.tasks.api.dto.request.TaskUpdateDTO;
import org.example.todolist.tasks.api.dto.response.TaskDTO;
import org.example.todolist.tasks.db.TaskEntity;
import org.example.todolist.tasks.db.TaskRepository;
import org.example.todolist.tasks.domain.mapper.TaskMapper;
import org.example.todolist.users.db.UserEntity;
import org.example.todolist.users.domain.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper;
    private final UserService userService;

    public List<TaskDTO> findAllByUser() {
        try {
            List<TaskEntity> taskEntities = taskRepository.findAllByUserId(userService.getCurrentUser().getId());
            return taskMapper.convertEntityToDto(taskEntities);
        }catch (Exception e){
            log.error("Задачи пользователя не найдены,ex={}", e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
    }

    public TaskDTO findById(Long taskId) {
        return taskMapper.convertEntityToDto(findEntityById(taskId));
    }

    public TaskDTO save(TaskCreateDTO taskCreateDTO) {
        try {
            if(taskCreateDTO == null) {
                log.error("Передан пустой taskCreateDTO");
                throw new IllegalStateException("Передан пустой taskCreateDTO");
            }
            UserEntity user = userService.getCurrentUser();
            TaskEntity task = taskRepository.save(TaskEntity.builder()
                    .title(taskCreateDTO.title())
                    .description(taskCreateDTO.description())
                    .completed(false)
                    .user(user)
                    .build());
            return taskMapper.convertEntityToDto(task);
        }catch (Exception e){
            log.error("Не удалось создать задачу ex={}", e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
    }

    @Transactional
    public TaskDTO update(TaskUpdateDTO taskUpdateDTO) {
        try {
            if(taskUpdateDTO == null) {
                log.error("Передан пустой taskUpdateDTO");
                throw new IllegalStateException("Передан пустой taskUpdateDTO");
            }

            TaskEntity task = findEntityById(taskUpdateDTO.id());
            task.setTitle(taskUpdateDTO.title());
            task.setDescription(taskUpdateDTO.description());

            TaskEntity updated = taskRepository.save(task);
            log.info("Задача обновлена с id={}", taskUpdateDTO.id());
            return taskMapper.convertEntityToDto(updated);
        }catch (Exception e){
            log.error("Не удалось обновить задачу ex={}", e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
    }

    @Transactional
    public TaskDTO complete(Long taskId) {
        try {
            return setCompleted(taskId,true);
        }catch (Exception e){
            log.error("Не удалось изменить на completed задачу ex={}", e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
    }

    @Transactional
    public TaskDTO unComplete(Long taskId) {
        try {
            return setCompleted(taskId,false);
        }catch (Exception e){
            log.error("Не удалось изменить на uncompleted задачу ex={}", e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
    }

    public void deleted(Long taskId) {
        try {
            taskRepository.deleteById(taskId);
            log.info("Задача id={} удален", taskId);
        }catch (Exception e){
            log.error("Ошибка при удаление задачи id={},ex={}", taskId, e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
    }

    private TaskDTO setCompleted(Long taskId,Boolean completed) {
        if(taskId == null) {
            log.error("Передан пустой taskId");
            throw new IllegalArgumentException("Передан пустой taskUpdateDTO");
        }
        TaskEntity task = findEntityById(taskId);
        task.setCompleted(true);

        TaskEntity updated = taskRepository.save(task);

        log.info("Задача изменина на выполнен с id={}", updated.getId());
        return taskMapper.convertEntityToDto(updated);
    }

    private TaskEntity findEntityById(Long taskId){
        if(taskId == null) {
            log.error("taskId пустой");
            throw new IllegalArgumentException("taskId пустой найти задачу невозможно");
        }
        return taskRepository.findById(taskId).orElseThrow(() -> new EntityNotFoundException("Задача не найдена"));
    }
}
