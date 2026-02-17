package org.example.hackaton.ai;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.hackaton.agent.db.AgentEntity;
import org.example.hackaton.agent.domain.AgentService;
import org.example.hackaton.chats.db.ChatEntity;
import org.example.hackaton.chats.domain.ChatService;
import org.example.hackaton.messages.db.MessageEntity;
import org.example.hackaton.messages.domain.MessageService;
import org.springframework.ai.ollama.OllamaChatModel;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class SendMessageIAService {
    private final OllamaChatModel model;
    private final MessageService messageService;
    private static final int MAX_DIALOG_TURNS = 10;
    private final AgentService agentService;
    private final ChatService chatService;

//    public String sendMessage(Long chatId) {//ОТПРАВКА СООбщение
//        Prompt prompt = new Prompt(messageService.getAllByChatId(chatId));
//
//        String answer = model.call(messageService.lastMessage(chatId));
//
//        messageService.save(
//                answer,
//                messageService.getQueueAI(chatId),
//                chatId
//        );
//        return answer;
//    }


    public List<String> startAgentDialog(Long chatId) {//TODO НОВАЯ ОПТИМИЗИРОВАННАЯ ВЕРСИЯ Подумать может как то ещё лучше можно
        List<String> dialogHistory = new ArrayList<>();

        ChatEntity chat = chatService.getChat(chatId);
        List<AgentEntity> agents = new ArrayList<>(chat.getAgents());

        if (agents.isEmpty()) {
            throw new IllegalStateException("Нет агентов в чате " + chatId);
        }

        List<MessageEntity> allMessages = messageService.getAllByChatIdEntity(chatId);
        Map<Long, List<MessageEntity>> messagesByAgent = allMessages.stream()
                .collect(Collectors.groupingBy(m -> m.getAgent().getId()));

        Map<Long, String> agentContextCache = new HashMap<>();

        CompletableFuture<String> initialFuture = CompletableFuture.supplyAsync(() ->
                model.call("Расскажи мне какой-то факт и задай один вопрос")
        );

        try {
            String initialResponse = initialFuture.get(10, TimeUnit.SECONDS);
            log.info("Начальный ответ: {}", initialResponse);
        } catch (Exception e) {
            log.warn("Не удалось получить начальный ответ", e);
        }

        for (int turn = 0; turn < MAX_DIALOG_TURNS; turn++) {
            long startTime = System.currentTimeMillis();

            int agentIndex = (int)((messageService.getCountMessagesChat(chatId) + turn) % agents.size());
            Long speakingAgentId = agents.get(agentIndex).getId();


            String lastMessage = allMessages.isEmpty() ?
                    "Привет, начни диалог" :
                    allMessages.getLast().getContent();

            String agentContext = agentContextCache.computeIfAbsent(speakingAgentId,
                    id -> buildAgentContext(messagesByAgent.getOrDefault(id, Collections.emptyList()))
            );

            AgentEntity currentAgent = agents.get(agentIndex);
            String prompt = String.format(
                    "История диалога:\n%s\n\n" +
                            "Твои сообщения:\n%s\n\n" +
                            "Последнее сообщение: %s\n\n" +
                            "Ты - %s. Твой характер: %s, настроение: %s\n" +
                            "Ответь как этот персонаж:",
                    buildFullContext(allMessages),
                    agentContext,
                    lastMessage,
                    currentAgent.getName(),
                    currentAgent.getPersonality(),
                    currentAgent.getMood()
            );

            String answer = model.call(prompt);

            MessageEntity savedMessage = messageService.save(answer, speakingAgentId, chatId);
            allMessages.add(savedMessage);

            dialogHistory.add(answer);

            long duration = System.currentTimeMillis() - startTime;//В будущем добавить статистику
        }

        return dialogHistory;
    }

    private String buildFullContext(List<MessageEntity> messages) {
        return messages.stream()
                .map(m -> String.format("[%s] %s: %s",
                        m.getCreatedAt(),
                        m.getAgent().getName(),
                        m.getContent()))
                .collect(Collectors.joining("\n"));
    }

    private String buildAgentContext(List<MessageEntity> agentMessages) {
        return agentMessages.stream()
                .map(MessageEntity::getContent)
                .collect(Collectors.joining("\n"));
    }
}
