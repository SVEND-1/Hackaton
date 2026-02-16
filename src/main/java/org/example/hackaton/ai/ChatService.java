package org.example.hackaton.ai;

import jakarta.mail.Message;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.AbstractChatMemoryAdvisor;
import org.springframework.stereotype.Service;

@Service
public class ChatService {

    public String sendMessage(ChatClient chatClient, Long userId, String message) {
        return chatClient
                .prompt()
                .advisors(advisorSpec -> advisorSpec.param(
                        AbstractChatMemoryAdvisor.CHAT_MEMORY_CONVERSATION_ID_KEY,String.valueOf(userId))
                )
                .user(message)
                .call()
                .content();
    }

}
