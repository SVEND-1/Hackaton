package org.example.hackaton.ai;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/ai")
public class AIController {

    private final SendMessageIAService sendMessageIAService;

    @PostMapping("/{chatId}")
    public ResponseEntity<List<String>> sendMessage(
            @PathVariable Long chatId
    ) {
        return ResponseEntity.ok(sendMessageIAService.startAgentDialog(chatId));
    }
}
