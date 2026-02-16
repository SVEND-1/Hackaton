package org.example.hackaton.agent.db;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import org.springframework.ai.chat.messages.Message;

import java.util.List;

@Converter
public class MessagesJsonConverter implements AttributeConverter<List<Message>, String> {
    private static final ObjectMapper objectMapper = new ObjectMapper()
            .registerModule(new JavaTimeModule());

    @Override
    public String convertToDatabaseColumn(List<Message> messages) {
        if (messages == null) {
            return null;
        }
        try {
            return objectMapper.writeValueAsString(messages);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Ошибка конвертации сообщений в JSON", e);
        }
    }

    @Override
    public List<Message> convertToEntityAttribute(String json) {
        if (json == null) {
            return null;
        }
        try {
            return objectMapper.readValue(json,
                    objectMapper.getTypeFactory().constructCollectionType(List.class, Message.class));
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Ошибка конвертации JSON в сообщения", e);
        }
    }
}