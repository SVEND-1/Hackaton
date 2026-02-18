package org.example.hackaton.chats.api;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.example.hackaton.agent.api.dto.response.AgentDTO;
import org.example.hackaton.chats.api.dto.responese.ChatResponse;
import org.example.hackaton.chats.domain.ChatService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<Boolean> chat(//TOdo Поменять Response
            @Parameter(description = "Название чата")
            @RequestParam String name,
            @Parameter(description = "Добавление агентов ровна 2")
            @RequestBody Set<AgentDTO> agents) {
        try {
            chatService.save(name,agents);
            return ResponseEntity.ok(true);
        }
        catch (Exception e) {
            return ResponseEntity.ok(false);
        }
    }

    @Operation(summary = "Удаление чата и AI-агентов каскадно")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        chatService.delete(id);
        return ResponseEntity.ok().build();
    }
}
