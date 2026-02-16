package org.example.todolist.tasks.api;

import lombok.RequiredArgsConstructor;
import org.example.todolist.tasks.api.dto.request.TaskCreateDTO;
import org.example.todolist.tasks.api.dto.request.TaskUpdateDTO;
import org.example.todolist.tasks.api.dto.response.TaskDTO;
import org.example.todolist.tasks.domain.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.config.Task;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {
    private final TaskService taskService;

    @GetMapping
    public ResponseEntity<List<TaskDTO>> getTasks() {
        return ResponseEntity.ok(taskService.findAllByUser());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskDTO> getTask(@PathVariable("id") Long id) {
        return ResponseEntity.ok(taskService.findById(id));
    }

    @PostMapping
    public ResponseEntity<TaskDTO> createTask(@RequestBody TaskCreateDTO taskCreateDTO) {
        return ResponseEntity.ok(taskService.save(taskCreateDTO));
    }

    @PutMapping
    public ResponseEntity<TaskDTO> updateTask(@RequestBody TaskUpdateDTO taskUpdateDTO) {
        return ResponseEntity.ok(taskService.update(taskUpdateDTO));
    }

    @PutMapping("/{id}/completed")
    public ResponseEntity<TaskDTO> completeTask(@PathVariable("id") Long id) {
        return ResponseEntity.ok(taskService.complete(id));
    }

    @PutMapping("/{id}/uncompleted")
    public ResponseEntity<TaskDTO> uncompleteTask(@PathVariable("id") Long id) {
        return ResponseEntity.ok(taskService.unComplete(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<TaskDTO> deleteTask(@PathVariable("id") Long id) {
        taskService.deleted(id);
        return ResponseEntity.ok().build();
    }
}
