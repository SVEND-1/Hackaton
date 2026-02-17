package org.example.hackaton.ai;

import lombok.RequiredArgsConstructor;
import org.example.hackaton.messages.db.TypeMessage;
import org.example.hackaton.messages.domain.MessageService;
import org.springframework.ai.ollama.OllamaChatModel;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SendMessageIAService {
    private final OllamaChatModel model;
    private final MessageService messageService;

    public String sendMessage(Long chatId) {//ОТПРАВКА СООбщение
        String answer = model.call(messageService.lastMessage(chatId));
        messageService.save(
                answer,
                messageService.getQueueAI(chatId),
                chatId
        );
        return answer;
    }
}
