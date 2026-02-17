package org.example.hackaton.chats.api;

import lombok.RequiredArgsConstructor;
import org.example.hackaton.agent.api.dto.response.AgentDTO;
import org.example.hackaton.chats.db.ChatEntity;
import org.example.hackaton.chats.domain.ChatService;
import org.example.hackaton.messages.db.MessageEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/chats")
@RequiredArgsConstructor
public class ChatController {
    private final ChatService chatService;

    @GetMapping("/{id}")
    public ResponseEntity<List<String>> getMessage(@PathVariable Long id) {
        ChatEntity chat = chatService.getChat(id);
        List<String> messages = chat.getMessages().stream().map(MessageEntity::getContent).toList();
        return ResponseEntity.ok(messages);
    }

    @PostMapping
    public ResponseEntity<Boolean> chat(@RequestBody Set<AgentDTO> agents) {
        try {
            chatService.save(agents);
            return ResponseEntity.ok(true);
        }
        catch (Exception e) {
            return ResponseEntity.ok(false);
        }
    }
}
