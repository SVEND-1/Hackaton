package org.example.hackaton.agent.api;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.example.hackaton.agent.api.dto.response.AgentProfileResponse;
import org.example.hackaton.agent.db.AgentEntity;
import org.example.hackaton.agent.domain.AgentService;
import org.example.hackaton.messages.domain.MessageService;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api/agents")
@RequiredArgsConstructor
@Tag(name = "Агенты", description = "Управление AI-агентами")
public class AgentController {

    private final AgentService agentService;
    private final MessageService messageService;
    private final ChatModel model;

    @GetMapping("/{id}/{chatId}")
    public AgentProfileResponse getProfile( @PathVariable("id") Long id,
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

}