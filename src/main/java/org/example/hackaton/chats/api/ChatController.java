package org.example.hackaton.chats.api;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.example.hackaton.agent.api.dto.response.AgentDTO;
import org.example.hackaton.chats.api.dto.request.CreateChatRequest;
import org.example.hackaton.chats.api.dto.responese.ChatResponse;
import org.example.hackaton.chats.domain.ChatService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/chats")
@RequiredArgsConstructor
public class ChatController {
    private final ChatService chatService;

    @GetMapping("/{id}")
    public ResponseEntity<ChatResponse> getMessage(@PathVariable Long id) {
        return ResponseEntity.ok(chatService.getChatDTO(id));
    }

    @GetMapping
    public ResponseEntity<List<ChatResponse>> getAllChatByUser(){
        return ResponseEntity.ok(chatService.findAllByUserId());
    }



    @Operation(summary = "Создание AI-агентов и чата")
    @PostMapping
    public ResponseEntity<Boolean> chat(
                                        @RequestBody CreateChatRequest createChatRequest) {
        try {
            chatService.save(createChatRequest.name(),createChatRequest.agents());
            return ResponseEntity.ok(true);
        }
        catch (Exception e) {
            return ResponseEntity.ok(false);
        }
    }
}
