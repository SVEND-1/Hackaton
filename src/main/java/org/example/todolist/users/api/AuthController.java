package org.example.todolist.users.api;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.example.todolist.users.api.dto.auth.request.LoginRequest;
import org.example.todolist.users.api.dto.auth.request.RegisterCodeRequest;
import org.example.todolist.users.api.dto.auth.request.ResetPasswordRequest;
import org.example.todolist.users.api.dto.auth.request.VerifyRegisterRequest;
import org.example.todolist.users.domain.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid LoginRequest loginRequest,
                                   HttpServletResponse response) {
        return ResponseEntity.ok(authService.login(loginRequest, response));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        return ResponseEntity.ok(authService.logout(response));
    }

    @PostMapping("/register/send-code")
    public ResponseEntity<?> sendRegistrationCode(@RequestBody @Valid RegisterCodeRequest request) {
        return ResponseEntity.ok(authService.sendRegistrationCode(request));
    }

    @PostMapping("/register/verify")
    public ResponseEntity<?> verifyRegistration(
            @RequestBody @Valid VerifyRegisterRequest request,
            HttpServletResponse response) {
        return ResponseEntity.ok(authService.verifyRegistration(request, response));
    }

    @PostMapping("/register/resend-code")
    public ResponseEntity<?> resendVerificationCode(@RequestParam String registrationId) {
        return ResponseEntity.ok(authService.resendVerificationCode(registrationId));
    }

    @PostMapping("/password/forgot")
    public ResponseEntity<?> forgotPassword(@RequestParam String email) {
        return ResponseEntity.ok(authService.forgotPassword(email));
    }

    @PostMapping("/password/verify")
    public ResponseEntity<?> verifyResetCode(
            @RequestParam String resetId,
            @RequestParam String code) {
        return ResponseEntity.ok(authService.verifyResetCode(resetId, code));
    }

    @PostMapping("/password/reset")
    public ResponseEntity<?> resetPassword(
            @RequestBody @Valid ResetPasswordRequest request,
            HttpServletResponse response) {
        return ResponseEntity.ok(authService.resetPassword(request, response));
    }
}
