package org.example.hackaton.users.api;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.example.hackaton.users.api.dto.users.response.UserDTO;
import org.example.hackaton.users.domain.UserService;
import org.example.hackaton.users.domain.mapper.UserMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Tag(name = "User", description = "Управление пользователя")
public class UserController {

    private final UserService userService;
    private final UserMapper userMapper;

    @Operation(summary = "Получение профиля пользователя")
    @GetMapping
    public ResponseEntity<UserDTO> getProfile() {
        return ResponseEntity.ok(userMapper.convertEntityToDto(userService.getCurrentUser()));//TODO Поменять
    }
}
