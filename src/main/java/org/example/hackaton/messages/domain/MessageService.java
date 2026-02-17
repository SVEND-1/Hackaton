package org.example.hackaton.messages.domain;

import lombok.RequiredArgsConstructor;
import org.example.hackaton.agent.domain.AgentService;

import org.example.hackaton.chats.domain.ChatService;
import org.example.hackaton.messages.db.MessageEntity;
import org.example.hackaton.messages.db.MessageRepository;
import org.example.hackaton.messages.db.TypeMessage;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository repository;
    private final AgentService agentService;
    private final ChatService chatService;

    @Transactional
    public MessageEntity save(TypeMessage type, String content, Long agentId,Long chatId) {
        MessageEntity entity = MessageEntity.builder()
                .type(type)
                .content(content)
                .createdAt(LocalDateTime.now())
                .agent(agentService.getAgent(agentId))
                .chat(chatService.getChat(chatId))
                .build();
        return repository.save(entity);
    }
}
