package org.example.hackaton.agent.db;

import ch.qos.logback.classic.pattern.MessageConverter;
import jakarta.persistence.*;
import lombok.*;
import org.example.hackaton.users.db.UserEntity;
import org.springframework.ai.chat.messages.Message;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "agents")
public class AgentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    //TODO Доделать фотку

    @Column(name = "name")
    private String name;

    @Column(name = "key_memories")
    private String keyMemories;

    @Column(name = "current_plans")
    private String currentPlans;

    @Column(name = "messages", columnDefinition = "TEXT")
    @Convert(converter = MessagesJsonConverter.class)
    private List<Message> messages = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    @Column(name = "personality")
    private Personality personality;

    @Column(name = "likin")
    private Boolean isLiking;

    @ManyToOne(fetch = FetchType.EAGER)
    private UserEntity user;
}
