package org.example.todolist.users.db;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {

    @Query("SELECT u FROM UserEntity u " +
            "LEFT JOIN FETCH u.tasks " +
            "WHERE LOWER(u.email) = LOWER(:email)")
    UserEntity findByEmailEqualsIgnoreCaseWithTasks(@Param("email") String username);

    UserEntity findByEmailEqualsIgnoreCase(String email);
}
