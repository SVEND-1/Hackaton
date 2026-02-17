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

    public String getAllByChatId(Long chatId) {
        List<MessageEntity> messages  = repository.findAllByChatId(chatId);
        StringBuilder builder = new StringBuilder();
        for (MessageEntity message : messages) {
            builder.append(message.getContent());
        }
        return builder.toString();
    }

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

        return messageCount % 2 == 0 ? agentList.getFirst().getId() : agentList.getFirst().getId() + 1;
    }


}
