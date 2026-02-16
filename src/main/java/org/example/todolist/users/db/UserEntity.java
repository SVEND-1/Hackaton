package org.example.todolist.users.db;

import jakarta.persistence.*;
import lombok.*;
import org.example.todolist.tasks.db.TaskEntity;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "users")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "role")
    private Role role;

    @Column(name = "tasks")
    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    private List<TaskEntity> tasks;

}
