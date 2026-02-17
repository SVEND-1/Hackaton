package org.example.hackaton.messages.domain;

import lombok.RequiredArgsConstructor;
import org.example.hackaton.agent.db.AgentEntity;
import org.example.hackaton.agent.domain.AgentService;

import org.example.hackaton.chats.db.ChatEntity;
import org.example.hackaton.chats.domain.ChatService;
import org.example.hackaton.messages.db.MessageEntity;
import org.example.hackaton.messages.db.MessageRepository;
import org.example.hackaton.messages.db.TypeMessage;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository repository;
    private final AgentService agentService;
    private final ChatService chatService;

    @Transactional
    public MessageEntity save(String content, Long agentId,Long chatId) {
        MessageEntity entity = MessageEntity.builder()
                .type(TypeMessage.DEEPSEK)
                .content(content)
                .createdAt(LocalDateTime.now())
                .agent(agentService.getAgent(agentId))
                .chat(chatService.getChat(chatId))
                .build();
        return repository.save(entity);
    }

    public String lastMessage(Long chatId) {
        Optional<MessageEntity> message = repository.findFirstByChatIdOrderByCreatedAtDesc(chatId);
        if(message.isPresent()) {
            return message.get().getContent();
        }
        else{
            return "Привет, начни наш диалог";
        }
    }

    public long getCountMessagesChat(Long chatId) {
        return repository.countMessagesByChatId(chatId);
    }

    public Long getQueueAI(Long chatId) {
        ChatEntity chat = chatService.getChat(chatId);
        long messageCount = getCountMessagesChat(chatId);

        Set<AgentEntity> agents = chat.getAgents();

        if (agents == null || agents.isEmpty()) {
            return null;
        }

        List<AgentEntity> agentList = new ArrayList<>(agents);

        int index = messageCount % 2 == 0 ? 0 : 1;


        if (index >= agentList.size()) {
            return agentList.getFirst().getId();
        }

        return agentList.get(index).getId();
    }
}
