package org.example.hackaton.agent.domain;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.hackaton.agent.api.dto.response.*;
import org.example.hackaton.agent.db.*;
import org.example.hackaton.messages.domain.MessageService;
import org.springframework.ai.ollama.OllamaChatModel;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Slf4j
@Service
@RequiredArgsConstructor
public class AgentService {
    private final OllamaChatModel model;
    private final AgentRepository agentRepository;
    private final MessageService messageService;

    public AgentEntity getAgent(Long agentId) {
        return agentRepository.findById(agentId).orElseThrow(() -> new EntityNotFoundException("Agent не найден"));
    }

    @Transactional
    public AgentProfileResponse getAgentProfile(Long id, Long chatId) {
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
        AgentEntity agent = getAgent(id);
        return new AgentProfileResponse(
                agent.getName(),
                agent.getPhoto(),
                agent.getPersonality(),
                agent.getMood(),
                memory,
                plan
        );
    }

    public AgentUpdateMood changeMood(Long agentId, Mood mood) {
        try {
            AgentEntity agentEntity = getAgent(agentId);
            agentEntity.setMood(mood);
            agentRepository.save(agentEntity);
            return new AgentUpdateMood(agentId, mood);
        }
        catch (Exception e) {
            log.error("Не получилось обновить mood={},agentId={},ex={}",mood,agentId, e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
    }

    public AgentUpdatePersonality changePersonality(Long agentId, Personality personality) {
        try {
            AgentEntity agentEntity = getAgent(agentId);
            agentEntity.setPersonality(personality);
            agentRepository.save(agentEntity);
            return new AgentUpdatePersonality(agentId, personality);
        }
        catch (Exception e) {
            log.error("Не получилось обновить personality={},agentId={},ex={}",personality,agentId, e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
    }
}