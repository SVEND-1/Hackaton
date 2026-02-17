package org.example.hackaton.chats.api;

import lombok.RequiredArgsConstructor;
import org.example.hackaton.agent.api.dto.response.AgentDTO;
import org.example.hackaton.chats.api.dto.responese.ChatResponse;
import org.example.hackaton.chats.domain.ChatService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping
    public ResponseEntity<Boolean> chat(
            @RequestParam String name,
            @RequestBody Set<AgentDTO> agents) {
        try {
            chatService.save(name,agents);
            return ResponseEntity.ok(true);
        }
        catch (Exception e) {
            return ResponseEntity.ok(false);
        }
    }
}
