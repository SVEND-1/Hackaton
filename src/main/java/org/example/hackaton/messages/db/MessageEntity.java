package org.example.hackaton.messages.db;

import jakarta.persistence.*;
import lombok.*;
import org.example.hackaton.agent.db.AgentEntity;
import org.example.hackaton.chats.db.ChatEntity;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "messages")
public class MessageEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "content")
    private String content;

    @Column(name = "create_at")
    private LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "type", columnDefinition = "varchar(50)")
    private TypeMessage type;

    @ManyToOne
    private AgentEntity agent;

    @ManyToOne
    private ChatEntity chat;
}
