package org.example.hackaton.chats.api;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.example.hackaton.chats.api.dto.request.CreateChatRequest;
import org.example.hackaton.chats.api.dto.responese.ChatCreateResponse;
import org.example.hackaton.chats.api.dto.responese.ChatResponse;
import org.example.hackaton.chats.domain.ChatService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/chats")
@RequiredArgsConstructor
@Tag(name = "Chat", description = "Управление чатами")
public class ChatController {
    private final ChatService chatService;

    @Operation(summary = "Получение чатов у текущего пользователя")
    @GetMapping
    public ResponseEntity<List<ChatResponse>> getAllChatByUser(){
        return ResponseEntity.ok(chatService.findAllByUserId());
    }

    @Operation(summary = "Получение чата по Id")
    @GetMapping("/{id}")
    public ResponseEntity<ChatResponse> getMessage(@PathVariable Long id) {
        return ResponseEntity.ok(chatService.getChatDTO(id));
    }


    @Operation(summary = "Создание AI-агентов и чата")
    @PostMapping
    public ResponseEntity<ChatCreateResponse> chat(
            @RequestBody CreateChatRequest createChatRequest
    ) {
        return ResponseEntity.ok(chatService.save(createChatRequest.name(),createChatRequest.agents()));
    }

    @Operation(summary = "Удаление чата и AI-агентов каскадно")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        chatService.delete(id);
        return ResponseEntity.ok().build();
    }
}
