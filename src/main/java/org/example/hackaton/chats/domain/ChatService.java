package org.example.hackaton.chats.domain;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.example.hackaton.agent.api.dto.response.AgentDTO;
import org.example.hackaton.agent.db.AgentEntity;
import org.example.hackaton.agent.domain.AgentMapper;
import org.example.hackaton.chats.api.dto.responese.ChatResponse;
import org.example.hackaton.chats.db.ChatEntity;
import org.example.hackaton.chats.db.ChatRepository;
import org.example.hackaton.chats.domain.mapper.ChatMapper;
import org.example.hackaton.images.service.ImageService;
import org.example.hackaton.users.db.Role;
import org.example.hackaton.users.db.UserEntity;
import org.example.hackaton.users.domain.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;
    private final UserService userService;
    private final AgentMapper agentMapper;
    private final ChatMapper chatMapper;
    private final ImageService imageService;

    @Transactional(readOnly = true)
    public ChatResponse getChatDTO(Long chatId) {
        ChatEntity chatEntity = chatRepository.findById(chatId)
                .orElseThrow(() -> new EntityNotFoundException("Chat не найден"));

        return chatMapper.convertEntityToDTO(chatEntity);
    }

    @Transactional(readOnly = true)
    public ChatEntity getChat(Long chatId) {
        return chatRepository.findById(chatId)
                .orElseThrow(() -> new EntityNotFoundException("Chat не найден"));
    }

    public List<ChatEntity> findAllByUserId(Long userId) {
        return chatRepository.findAllByUserId(userId);
    }

    @Transactional
    public ChatEntity save(String name,Set<AgentDTO> agents) {
        Set<AgentEntity> agentEntities = agents.stream()
                .map(el -> {
                    AgentEntity agent = agentMapper.convertDTOToEntity(el);
                    agent.setPhoto(imageService.uploadImage(el.photo()));
                    return agent;
                })
                .collect(Collectors.toSet());

        ChatEntity chatEntity = ChatEntity.builder()
                .name(name)
                .createdAt(LocalDateTime.now())
                .agents(agentEntities)
                .user(UserEntity.builder()
                        .id(1L)
                        .email("user@example.com")
                        .role(Role.USER)
                        .password("password")
                        .build())
                .build();

        for (AgentEntity agent : agentEntities) {
            agent.setChat(chatEntity);
        }

        return chatRepository.save(chatEntity);
    }


    public void delete(Long chatId) {
        chatRepository.deleteById(chatId);
    }
}
