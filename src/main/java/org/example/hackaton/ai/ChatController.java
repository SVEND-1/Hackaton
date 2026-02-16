package org.example.hackaton.ai;

import lombok.RequiredArgsConstructor;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.AbstractChatMemoryAdvisor;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.ai.chat.messages.Message;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {//TODO переделать на чаты
    private final ChatClient chatClient;
    private final ChatMemory chatMemory;

    @PostMapping("/{userId}")
    public String chat(
            @PathVariable Long userId,
            @RequestParam String request) {
        return chatClient
                .prompt()
                .advisors(advisorSpec -> advisorSpec.param(
                        AbstractChatMemoryAdvisor.CHAT_MEMORY_CONVERSATION_ID_KEY,String.valueOf(userId))
                )
                .user(request)
                .call()
                .content();
    }

    @GetMapping("/{userId}/history")
    public List<Message> history(@PathVariable Long userId) {
        return chatMemory.get(String.valueOf(userId),100);
    }

    @DeleteMapping("/{userId}/history")
    public String clearHistory(@PathVariable Long userId) {
        chatMemory.clear(String.valueOf(userId));
        return "Чат очищен";
    }
}
