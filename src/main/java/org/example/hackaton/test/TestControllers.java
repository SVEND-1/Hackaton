package org.example.hackaton.test;

import lombok.RequiredArgsConstructor;
import org.example.hackaton.users.db.UserEntity;
import org.example.hackaton.users.domain.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tests")
@RequiredArgsConstructor
public class TestControllers {
    private final UserService userService;

    @GetMapping("/jwt")
    public ResponseEntity<UserEntity> jwtTest() {
        UserEntity user = userService.getCurrentUser();
        return ResponseEntity.ok(user);
    }
}
