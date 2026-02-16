package org.example.hackaton.ai.api;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.ollama.OllamaChatModel;
import org.springframework.ai.ollama.api.OllamaModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;


@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
@Slf4j
public class AIController {
    private final OllamaChatModel ollamaModel;

    @GetMapping("/ask")
    public String ask(@RequestParam String question) {

        String answer = ollamaModel.call(question);
        log.info(answer);
        return answer;
    }

    @GetMapping("/test")
    public String test() {
        String answer = ollamaModel.call("Ты кто");
        log.info(answer);
        return answer;
    }

    @GetMapping("/test/stream")
    public Flux<String> testStream(@RequestParam String question) {
        return ollamaModel.stream(question);
    }
}
