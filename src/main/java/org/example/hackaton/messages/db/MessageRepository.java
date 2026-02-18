package org.example.hackaton.messages.db;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MessageRepository extends JpaRepository<MessageEntity, Long> {
    @Query("SELECT COUNT(m) FROM MessageEntity m WHERE m.chat.id = :chatId")
    long countMessagesByChatId(@Param("chatId") Long chatId);

    Optional<MessageEntity> findFirstByChatIdOrderByCreatedAtDesc(Long chatId);

    List<MessageEntity> findAllByChatId(Long chatId);

    List<MessageEntity> findAllByAgent_Id(Long agentId);
}
