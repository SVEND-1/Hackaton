package org.example.hackaton.agent.api;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.example.hackaton.agent.api.dto.response.AgentProfileResponse;
import org.example.hackaton.agent.db.AgentEntity;
import org.example.hackaton.agent.db.Mood;
import org.example.hackaton.agent.db.Personality;
import org.example.hackaton.agent.domain.AgentService;
import org.example.hackaton.messages.domain.MessageService;
import org.springframework.ai.ollama.OllamaChatModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api/agents")
@RequiredArgsConstructor
@Tag(name = "Agent", description = "Управление AI-агентами")
public class AgentController {

    private final AgentService agentService;
    private final MessageService messageService;
    private final OllamaChatModel model;

    @ApiResponse(
            responseCode = "200",description = "Получен профиль AI-агента",
            content = {@Content(mediaType = "application/json",
            schema = @Schema(implementation = AgentProfileResponse.class))}
    )
    @Operation(summary = "Получения профиля AI-агента")
    @GetMapping("/{id}/{chatId}")
    public AgentProfileResponse getProfile(@PathVariable("id") Long id,
                                @PathVariable("chatId") Long chatId) {
        String fullContext = messageService.getAllByChatId(chatId);
        String agentContext = messageService.getAllByAgentId(id);

        String memories = String.format(
                "Вот история вашего диалога:\n%s\n\n" +
                        "Вот твои сообщения из всего диалога: %s" +
                        "Ответь на вопрос какие у тебя ключевые есть воспоминания",
                fullContext, agentContext
        );

        String plans = String.format(
                "Вот история вашего диалога:\n%s\n\n" +
                        "Вот твои сообщения из всего диалога: %s" +
                        "Ответь на вопрос какие у тебя дальнейшие планы",
                fullContext, agentContext
        );


        String memory = model.call(memories);
        String plan = model.call(plans);
        AgentEntity agent = agentService.getAgent(id);
        return new AgentProfileResponse(
                agent.getName(),
                agent.getPhoto(),
                agent.getPersonality(),
                agent.getMood(),
                memory,
                plan
        );
    }

    @Operation(summary = "Изменения настроение AI-агента")
    @PutMapping("/{id}/change-mood")
    public ResponseEntity<AgentEntity> changeMood(
                                    @PathVariable Long id,
                                    @Parameter(description = "Новое настроение Ai-агента")
                                    @RequestBody Mood mood) {
        return ResponseEntity.ok(agentService.changeMood(id,mood));
    }

    @Operation(summary = "Изменения характера AI-агента")
    @PutMapping("/{id}/change-personality")
    public ResponseEntity<AgentEntity> changePersonality(
                                    @PathVariable Long id,
                                    @Parameter(description = "Новый характер Ai-агента")
                                    @RequestBody Personality personality) {
        return ResponseEntity.ok(agentService.changePersonality(id,personality));
    }
}