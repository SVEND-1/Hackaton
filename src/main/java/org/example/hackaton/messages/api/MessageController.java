package org.example.hackaton.messages.api;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.example.hackaton.agent.api.dto.response.AgentProfileResponse;
import org.example.hackaton.messages.db.MessageEntity;
import org.example.hackaton.messages.db.TypeMessage;
import org.example.hackaton.messages.domain.MessageService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/messages")
@Tag(name = "Message", description = "Управление сообщениями")
public class MessageController {
    private final MessageService messageService;

    @ApiResponse(
                    responseCode = "200",description = "Отправлено сообщение",
                    content = {@Content(mediaType = "application/json",
                    schema = @Schema(implementation = MessageEntity.class))}
    )
    @Operation(summary = "Отправка сообщения в чат")
    @PostMapping
    public MessageEntity createMessage(
            @RequestParam String content,
            @RequestParam Long agentId,
            @RequestParam Long chatId
            ) {
        return messageService.save(content, agentId, chatId);
    }
}
