package org.example.hackaton.chats.db;

import jakarta.persistence.*;
import lombok.*;
import org.example.hackaton.agent.db.AgentEntity;
import org.example.hackaton.messages.db.MessageEntity;
import org.example.hackaton.users.db.UserEntity;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "chats")
public class ChatEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "chat",cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    private List<MessageEntity> messages;

    @OneToMany(mappedBy = "chat",cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<AgentEntity> agents;

    @ManyToOne(fetch = FetchType.EAGER)
    private UserEntity user;

    @Column(name = "create_at")
    private LocalDateTime createdAt;

    public void addMessage(MessageEntity message) {
        messages.add(message);
    }

    public void removeMessage(MessageEntity message) {
        messages.remove(message);
    }
}
