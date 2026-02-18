package org.example.hackaton.ai.api;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.example.hackaton.ai.domain.SendMessageIAService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/ai")
@Tag(name = "AI", description = "Управление событиями с AI-агентами")
public class AIController {

    private final SendMessageIAService sendMessageIAService;

    @Operation(summary = "Начать чат между двумя агентами")
    @PostMapping("/{chatId}")
    public ResponseEntity<List<String>> sendMessage(
            @PathVariable Long chatId
    ) {
        return ResponseEntity.ok(sendMessageIAService.startAgentDialog(chatId));
    }

    @Operation(summary = "Создать event для обоих агентов")
    @PostMapping("/{chatId}/event")
    public ResponseEntity<List<String>> sendEvent(
            @PathVariable Long chatId,
            @Parameter(description = "event который повлияет на поведение AI-агентов")
            @RequestParam String event
    ) {
        sendMessageIAService.event(event,chatId);
        return ResponseEntity.ok().build();
    }
}
