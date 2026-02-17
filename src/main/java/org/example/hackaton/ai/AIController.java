package org.example.hackaton.ai;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/ai")
public class AIController {

    private final SendMessageIAService sendMessageIAService;

    @PostMapping("/{chatId}")
    public ResponseEntity<String> sendMessage(
            @PathVariable Long chatId
    ) {
        return ResponseEntity.ok(sendMessageIAService.sendMessage(chatId));
    }
}
