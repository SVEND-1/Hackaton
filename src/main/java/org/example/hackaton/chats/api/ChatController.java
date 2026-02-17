package org.example.hackaton.chats.api;

import lombok.RequiredArgsConstructor;
import org.example.hackaton.agent.api.dto.response.AgentDTO;
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
public class ChatController {
    private final ChatService chatService;

    @GetMapping("/{id}")
    public ResponseEntity<ChatResponse> getMessage(@PathVariable Long id) {
        return ResponseEntity.ok(chatService.getChatDTO(id));
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> chat(
            @RequestParam String name,
            @RequestBody Set<AgentDTO> agents,
            @RequestParam MultipartFile agentPhoto1,
            @RequestParam MultipartFile agentPhoto2) {
        try {
            chatService.save(name,agents,agentPhoto1,agentPhoto2);
            return ResponseEntity.ok(true);
        } catch (Exception e) {
            return ResponseEntity.ok(false);
        }
    }
}
