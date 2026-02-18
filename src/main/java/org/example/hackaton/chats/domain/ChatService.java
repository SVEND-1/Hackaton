package org.example.hackaton.chats.domain;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.hackaton.agent.api.dto.response.AgentDTO;
import org.example.hackaton.agent.db.AgentEntity;
import org.example.hackaton.agent.domain.AgentMapper;
import org.example.hackaton.chats.api.dto.responese.ChatCreateResponse;
import org.example.hackaton.chats.api.dto.responese.ChatResponse;
import org.example.hackaton.chats.db.ChatEntity;
import org.example.hackaton.chats.db.ChatRepository;
import org.example.hackaton.chats.domain.mapper.ChatMapper;
import org.example.hackaton.users.db.Role;
import org.example.hackaton.users.db.UserEntity;
import org.example.hackaton.users.domain.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;
    private final UserService userService;
    private final AgentMapper agentMapper;
    private final ChatMapper chatMapper;

    @Transactional(readOnly = true)
    public ChatResponse getChatDTO(Long chatId) {
        ChatEntity chatEntity = chatRepository.findById(chatId)
                .orElseThrow(() -> new EntityNotFoundException("Chat не найден"));

        return chatMapper.convertEntityToDTOResponse(chatEntity);
    }

    @Transactional(readOnly = true)
    public ChatEntity getChat(Long chatId) {
        return chatRepository.findById(chatId)
                .orElseThrow(() -> new EntityNotFoundException("Chat не найден"));
    }

    @Transactional(readOnly = true)
    public List<ChatResponse> findAllByUserId() {
        List<ChatEntity> chat = chatRepository.findAllByUserId(userService.getCurrentUser().getId());
        return chat.stream()
                .map(chatMapper::convertEntityToDTOResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public ChatCreateResponse save(String name,Set<AgentDTO> agents) {
        try {
            Set<AgentEntity> agentEntities = agents.stream()
                    .map(agentMapper::convertDTOToEntity)
                    .collect(Collectors.toSet());

            ChatEntity chatEntity = ChatEntity.builder()
                    .name(name)
                    .createdAt(LocalDateTime.now())
                    .agents(agentEntities)
                    .user(UserEntity.builder()//TODO ПОМЕНЯТЬ НА ТЕКУЩЕГО ПОЛЬЗОВАТЕЛЯ
                            .id(1L)
                            .email("user@example.com")
                            .role(Role.USER)
                            .password("password")
                            .build())
                    .build();

            for (AgentEntity agent : agentEntities) {
                agent.setChat(chatEntity);
            }

            ChatEntity saved = chatRepository.save(chatEntity);
            return new ChatCreateResponse(
                    saved.getId(),
                    saved.getName(),
                    saved.getCreatedAt()
            );
        }catch (Exception e){
            log.error("Не удалось сохранить chat,ex={}", e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
    }


    @Transactional
    public void delete(Long chatId) {
        try {
            chatRepository.deleteById(chatId);
        }catch (Exception e){
            log.error("Не удалось удалить чат ,ex={}", e.getMessage());
            throw new RuntimeException(e.getMessage());
        }
    }
}
