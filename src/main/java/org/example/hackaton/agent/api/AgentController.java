package org.example.hackaton.agent.api;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.example.hackaton.agent.api.dto.response.AgentProfileResponse;
import org.example.hackaton.agent.api.dto.response.AgentUpdateMood;
import org.example.hackaton.agent.api.dto.response.AgentUpdatePersonality;
import org.example.hackaton.agent.db.Mood;
import org.example.hackaton.agent.db.Personality;
import org.example.hackaton.agent.domain.AgentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api/agents")
@RequiredArgsConstructor
@Tag(name = "Agent", description = "Управление AI-агентами")
public class AgentController {

    private final AgentService agentService;

    @ApiResponse(
            responseCode = "200",description = "Получен профиль AI-агента",
            content = {@Content(mediaType = "application/json",
            schema = @Schema(implementation = AgentProfileResponse.class))}
    )
    @Operation(summary = "Получения профиля AI-агента")
    @GetMapping("/{id}/{chatId}")
    public ResponseEntity<AgentProfileResponse> getProfile(@PathVariable("id") Long id,
                                @PathVariable("chatId") Long chatId) {
        return ResponseEntity.ok(agentService.getAgentProfile(id,chatId));
    }

    @Operation(summary = "Изменения настроение AI-агента")
    @PutMapping("/{id}/change-mood")
    public ResponseEntity<AgentUpdateMood> changeMood(//TODO DTO
                                                      @PathVariable Long id,
                                                      @Parameter(description = "Новое настроение Ai-агента")
                                    @RequestBody Mood mood) {
        return ResponseEntity.ok(agentService.changeMood(id,mood));
    }

    @Operation(summary = "Изменения характера AI-агента")
    @PutMapping("/{id}/change-personality")
    public ResponseEntity<AgentUpdatePersonality> changePersonality(
                                    @PathVariable Long id,
                                    @Parameter(description = "Новый характер Ai-агента")
                                    @RequestBody Personality personality) {
        return ResponseEntity.ok(agentService.changePersonality(id,personality));
    }
}