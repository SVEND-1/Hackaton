package org.example.hackaton.agent.domain;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.example.hackaton.agent.api.dto.request.AgentCreateRequest;
import org.example.hackaton.agent.api.dto.response.AgentChatResponse;
import org.example.hackaton.agent.api.dto.response.AgentDTO;
import org.example.hackaton.agent.db.*;
import org.example.hackaton.messages.api.response.MessageDTO;
import org.example.hackaton.messages.domain.mapper.MessageMapper;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AgentService {
    private final ChatClient chatClient;
    private final AgentRepository agentRepository;
    private final MessageMapper messageMapper;
    private final AgentMapper agentMapper;

    public AgentEntity getAgent(Long agentId) {
        return agentRepository.findById(agentId).orElseThrow(() -> new EntityNotFoundException("Agent не найден"));
    }

    public AgentEntity save(AgentCreateRequest agentCreateRequest) {
        String photo = agentCreateRequest.file().getName();//TODO поменять

        AgentEntity agent = AgentEntity.builder()
                .name(agentCreateRequest.name())
                .photo(photo)
                .personality(agentCreateRequest.personality())
                .mood(agentCreateRequest.mood())
                .build();

        return agentRepository.save(agent);
    }

    public AgentChatResponse toAgentChatResponse(AgentEntity agent) {
        if (agent == null) return null;

        List<MessageDTO> messages = agent.getMessage().stream()
                .map(messageMapper::convertEntityToDTO)
                .collect(Collectors.toList());

        AgentDTO agentDTO = agentMapper.convertEntityToDTO(agent);

        return new AgentChatResponse(messages, agentDTO);
    }

//    private List<String> eventLog = new ArrayList<>();
//
//    @Transactional
//    public void initAgents() {
//        // Очищаем предыдущих агентов
//        agentRepository.deleteAll();
//
//        // Создаем агентов
//        AgentEntity a1 = AgentEntity.builder()
//                .name("Алиса")
//                .personality("дружелюбная и любопытная")
//                .mood(Mood.HAPPY)
//                .memories(new ArrayList<>())
//                .relationships(new ArrayList<>())
//                .build();
//
//        AgentEntity a2 = AgentEntity.builder()
//                .name("Боб")
//                .personality("рациональный и спокойный")
//                .mood(Mood.THOUGHTFUL)
//                .memories(new ArrayList<>())
//                .relationships(new ArrayList<>())
//                .build();
//
//        AgentEntity a3 = AgentEntity.builder()
//                .name("Чарли")
//                .personality("энергичный и эмоциональный")
//                .mood(Mood.EXCITED)
//                .memories(new ArrayList<>())
//                .relationships(new ArrayList<>())
//                .build();
//
//        agentRepository.saveAll(List.of(a1, a2, a3));
//        addEvent("Мир создан. Три агента появились в симуляции");
//    }
//
//    @Transactional
//    public String interact(Long fromId, Long toId) {
//        AgentEntity from = agentRepository.findById(fromId).orElseThrow();
//        AgentEntity to = agentRepository.findById(toId).orElseThrow();
//
//        String prompt = String.format(
//                "Ты агент по имени %s. Твой характер: %s. Сейчас ты в настроении: %s %s. " +
//                        "Общаешься с агентом %s, у которого характер: %s. " +
//                        "Напиши ОДНО сообщение этому агенту (максимум 2 предложения), учитывая своё настроение.",
//                from.getName(), from.getPersonality(), from.getMood(), from.getMood().getEmoji(),
//                to.getName(), to.getPersonality()
//        );
//
//        String message = chatClient.prompt()
//                .user(prompt)
//                .call()
//                .content();
//
//        // Обновляем отношения
//        Optional<RelationshipEntity> existingRel = relationshipRepository
//                .findByAgentIdAndTargetAgentId(fromId, toId);
//
//        RelationshipEntity relationship;
//        if (existingRel.isPresent()) {
//            relationship = existingRel.get();
//            relationship.setInteractions(relationship.getInteractions() + 1);
//            relationship.setLastInteraction(LocalDateTime.now());
//        } else {
//            relationship = RelationshipEntity.builder()
//                    .agent(from)
//                    .targetAgentId(toId)
//                    .interactions(1)
//                    .liking(0.0)
//                    .lastInteraction(LocalDateTime.now())
//                    .build();
//        }
//
//        updateLiking(relationship, message);
//        relationshipRepository.save(relationship);
//
//        changeMood(from, message);
//        agentRepository.save(from);
//
//        addMemory(fromId, "Поговорил с " + to.getName() + ": " + message, 0.5, from.getMood());
//
//        String event = String.format("%s [%s] → %s [%s]: %s",
//                from.getName(), from.getMood().getEmoji(),
//                to.getName(), to.getMood().getEmoji(),
//                message);
//        addEvent(event);
//
//        return event;
//    }
//
//    private void updateLiking(RelationshipEntity rel, String message) {
//        double currentLiking = rel.getLiking() != null ? rel.getLiking() : 0.0;
//        String lowerMsg = message.toLowerCase();
//
//        if (lowerMsg.contains("спасибо") || lowerMsg.contains("рад") ||
//                lowerMsg.contains("хорошо") || lowerMsg.contains("отлично") ||
//                lowerMsg.contains("друг") || lowerMsg.contains("👍")) {
//            rel.setLiking(Math.min(1.0, currentLiking + 0.1));
//        } else if (lowerMsg.contains("плохо") || lowerMsg.contains("не нравится") ||
//                lowerMsg.contains("зол") || lowerMsg.contains("ужасно") ||
//                lowerMsg.contains("👎")) {
//            rel.setLiking(Math.max(-1.0, currentLiking - 0.1));
//        } else {
//            rel.setLiking(currentLiking);
//        }
//    }
//
//    private void changeMood(AgentEntity agent, String message) {
//        Mood newMood = agent.getMood();
//        String lowerMsg = message.toLowerCase();
//
//        if (lowerMsg.contains("!") || lowerMsg.contains("ура") || lowerMsg.contains("круто")) {
//            newMood = Mood.EXCITED;
//        } else if (lowerMsg.contains("?") || lowerMsg.contains("почему")) {
//            newMood = Mood.THOUGHTFUL;
//        } else if (lowerMsg.contains("груст") || lowerMsg.contains("жаль")) {
//            newMood = Mood.SAD;
//        } else if (lowerMsg.contains("зол") || lowerMsg.contains("надоел")) {
//            newMood = Mood.ANGRY;
//        } else if (lowerMsg.contains("устал") || lowerMsg.contains("спать")) {
//            newMood = Mood.TIRED;
//        } else if (lowerMsg.contains("хорошо") || lowerMsg.contains("отлично")) {
//            newMood = Mood.HAPPY;
//        }
//
//        agent.setMood(newMood);
//    }
//
//    @Transactional
//    public void addMemory(Long agentId, String content, double importance, Mood mood) {
//        AgentEntity agent = agentRepository.findById(agentId).orElseThrow();
//
//        MemoryEntity memory = MemoryEntity.builder()
//                .agent(agent)
//                .content(content)
//                .timestamp(LocalDateTime.now())
//                .importance(importance)
//                .moodAtTime(mood)
//                .build();
//
//        memoryRepository.save(memory);
//
//        // Автоматическая суммаризация если больше 10 воспоминаний
//        List<MemoryEntity> memories = memoryRepository.findByAgentIdOrderByTimestampDesc(agentId);
//        if (memories.size() > 10) {
//            summarizeMemories(agentId);
//        }
//    }
//
//    @Transactional
//    public void summarizeMemories(Long agentId) {
//        List<MemoryEntity> memories = memoryRepository.findByAgentIdOrderByTimestampDesc(agentId);
//
//        if (memories.size() <= 5) return;
//
//        List<MemoryEntity> oldMemories = memories.subList(5, memories.size());
//        String memoriesText = oldMemories.stream()
//                .map(MemoryEntity::getContent)
//                .reduce((a, b) -> a + "\n" + b)
//                .orElse("");
//
//        if (memoriesText.isEmpty()) return;
//
//        String summary = chatClient.prompt()
//                .user("Суммаризируй эти воспоминания кратко (одно предложение):\n" + memoriesText)
//                .call()
//                .content();
//
//        for (MemoryEntity memory : oldMemories) {
//            memoryRepository.delete(memory);
//        }
//
//        AgentEntity agent = agentRepository.findById(agentId).orElseThrow();
//        MemoryEntity summaryMemory = MemoryEntity.builder()
//                .agent(agent)
//                .content("[Сводка] " + summary)
//                .timestamp(LocalDateTime.now())
//                .importance(0.8)
//                .moodAtTime(agent.getMood())
//                .build();
//
//        memoryRepository.save(summaryMemory);
//    }
//
//    @Transactional
//    public String act(Long agentId) {
//        List<AgentEntity> otherAgents = agentRepository.findAll().stream()
//                .filter(a -> !a.getId().equals(agentId))
//                .toList();
//
//        if (!otherAgents.isEmpty()) {
//            Random rand = new Random();
//            Long targetId = otherAgents.get(rand.nextInt(otherAgents.size())).getId();
//            return interact(agentId, targetId);
//        }
//
//        return "Нет других агентов для взаимодействия";
//    }
//
//    @Transactional(readOnly = true)
//    public List<AgentEntity> getAllAgents() {
//        List<AgentEntity> agents = agentRepository.findAllAgents();
//
//        for (AgentEntity agent : agents) {
//            agent.getMemories().size();
//            agent.getRelationships().size();
//        }
//
//        return agents;
//    }
//
//    @Transactional(readOnly = true)
//    public AgentEntity getAgent(Long id) {
//        return agentRepository.findById(id).orElse(null);
//    }
//
//    @Transactional(readOnly = true)
//    public AgentEntity getAgentWithMemories(Long id) {
//        return agentRepository.findByIdWithMemories(id).orElse(null);
//    }
//
//    @Transactional(readOnly = true)
//    public AgentEntity getAgentWithRelationships(Long id) {
//        return agentRepository.findByIdWithRelationships(id).orElse(null);
//    }
//
//    public List<String> getEventLog() {
//        return eventLog;
//    }
//
//    private void addEvent(String event) {
//        eventLog.add(0, "[" + LocalDateTime.now().toLocalTime() + "] " + event);
//        if (eventLog.size() > 50) eventLog.remove(eventLog.size() - 1);
//    }
}