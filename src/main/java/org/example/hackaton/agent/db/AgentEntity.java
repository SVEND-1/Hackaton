package org.example.hackaton.agent.db;

import jakarta.persistence.*;
import lombok.*;
import org.example.hackaton.chats.db.ChatEntity;
import org.example.hackaton.messages.db.MessageEntity;
import org.example.hackaton.messages.db.TypeMessage;

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

    @Column(name = "name")
    private String name;

    @Column(name = "photo")
    private String photo;

    @Enumerated(EnumType.STRING)
    @Column(name = "personality")
    private Personality personality;

    @Enumerated(EnumType.STRING)
    @Column(name = "mood")
    private Mood mood;

    @Column(name = "current_goal")
    private String currentGoal;

    @OneToMany(mappedBy = "agent",fetch = FetchType.EAGER,cascade = CascadeType.ALL)
    private List<MessageEntity> message;

    @ManyToOne(fetch = FetchType.EAGER)
    private ChatEntity chat;
}
