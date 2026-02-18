package org.example.hackaton.messages.domain;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.hackaton.agent.db.AgentEntity;
import org.example.hackaton.agent.domain.AgentService;

import org.example.hackaton.chats.db.ChatEntity;
import org.example.hackaton.chats.domain.ChatService;
import org.example.hackaton.messages.db.MessageEntity;
import org.example.hackaton.messages.db.MessageRepository;
import org.example.hackaton.messages.db.TypeMessage;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository repository;
    private final AgentService agentService;
    private final ChatService chatService;

    @Transactional(readOnly = true)
    public String getAllByChatId(Long chatId) {
        List<MessageEntity> messages  = repository.findAllByChatId(chatId);
        StringBuilder builder = new StringBuilder();
        for (MessageEntity message : messages) {
            builder.append(message.getContent());
        }
        return builder.toString();
    }
    @Transactional(readOnly = true)
    public List<MessageEntity> getAllByChatIdEntity(Long chatId) {
        return repository.findAllByChatId(chatId);
    }

    @Transactional(readOnly = true)
    public String getAllByAgentId(Long agentId) {
        List<MessageEntity> messages  = repository.findAllByAgent_Id((agentId));
        StringBuilder builder = new StringBuilder();
        for (MessageEntity message : messages) {
            builder.append(message.getContent());
        }
        return builder.toString();
    }

    @Transactional
    public MessageEntity save(String content, Long agentId,Long chatId) {
        try {
            MessageEntity entity = MessageEntity.builder()
                    .type(TypeMessage.DEEPSEK)
                    .content(content)
                    .createdAt(LocalDateTime.now())
                    .agent(agentService.getAgent(agentId))
                    .chat(chatService.getChat(chatId))
                    .build();
            return repository.save(entity);
        }catch (Exception e){
            log.error("Не получилось сохранить сообщение,ex={}", e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
    }

    @Transactional
    public MessageEntity saveEvent(String content, Long chatId) {
        try {
            ChatEntity chat = chatService.getChat(chatId);//TODO ПЕРЕПИСАТЬ МЕТОД
            MessageEntity entity = MessageEntity.builder()
                    .type(TypeMessage.DEEPSEK)
                    .content(content)
                    .createdAt(LocalDateTime.now())
                    .agent(chat.getAgents().stream().findFirst().orElse(null))
                    .chat(chat)
                    .build();
            return repository.save(entity);
        }catch (Exception e){
            log.error("Не удалось сохранить event,ex={}", e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
    }

}
