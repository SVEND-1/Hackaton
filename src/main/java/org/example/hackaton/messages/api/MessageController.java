package org.example.hackaton.messages.api;

import lombok.RequiredArgsConstructor;
import org.example.hackaton.messages.db.MessageEntity;
import org.example.hackaton.messages.db.TypeMessage;
import org.example.hackaton.messages.domain.MessageService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/messages")
public class MessageController {
    private final MessageService messageService;

    @PostMapping
    public MessageEntity createMessage(
            @RequestParam String content,
            @RequestParam Long agentId,
            @RequestParam Long chatId
            ) {
        return messageService.save(content, agentId, chatId);
    }
}
