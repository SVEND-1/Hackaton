package org.example.hackaton.ai;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.hackaton.messages.domain.MessageService;
import org.springframework.ai.ollama.OllamaChatModel;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class SendMessageIAService {
    private final OllamaChatModel model;
    private final MessageService messageService;
    private static final int MAX_DIALOG_TURNS = 10;

//    public String sendMessage(Long chatId) {//ОТПРАВКА СООбщение
//        Prompt prompt = new Prompt(messageService.getAllByChatId(chatId));
//
//        String answer = model.call(messageService.lastMessage(chatId));
//
//        messageService.save(
//                answer,
//                messageService.getQueueAI(chatId),
//                chatId
//        );
//        return answer;
//    }


    public List<String> startAgentDialog(Long chatId) {
        List<String> dialogHistory = new ArrayList<>();

        model.call("Расскажи мне какой то факт и задай вопрос один на который я должен ответить");

        for (int turn = 0; turn < MAX_DIALOG_TURNS; turn++) {
            Long speakingAgentId = messageService.getQueueAI(chatId);

            String fullContext = messageService.getAllByChatId(chatId);
            String agentContext = messageService.getAllByAgentId(speakingAgentId);
            String lastMessage = messageService.lastMessage(chatId);

            String agentPrompt = String.format(
                    "Вот история вашего диалога:\n%s\n\n" +
                            "Вот твои сообщения из всего диалога: %s" +
                            "Тебе сказали:\n%s\n\n продолжи диалог",
                    fullContext, agentContext,lastMessage
            );

            String answer = model.call(agentPrompt);

            log.info(answer + "Получен ответ");
            messageService.save(answer, speakingAgentId, chatId);
            log.info("Ответ перешел в commit на бд ,но ещшё не закаммитился ");
            dialogHistory.add(answer);
        }

        return dialogHistory;
    }
}
