package org.example.hackaton.ai;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.hackaton.agent.db.AgentEntity;
import org.example.hackaton.agent.domain.AgentService;
import org.example.hackaton.chats.db.ChatEntity;
import org.example.hackaton.chats.domain.ChatService;
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
    private final AgentService agentService;
    private final ChatService chatService;

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

        ChatEntity chat = chatService.getChat(chatId);
        if (chat.getAgents() == null || chat.getAgents().isEmpty()) {
            throw new IllegalStateException("Невозможно начать диалог: в чате " + chatId + " нет агентов");
        }


        model.call("Расскажи мне какой то факт и задай вопрос один на который я должен ответить");

        for (int turn = 0; turn < MAX_DIALOG_TURNS; turn++) {
            Long speakingAgentId = messageService.getQueueAI(chatId);

            String fullContext = messageService.getAllByChatId(chatId);
            String agentContext = messageService.getAllByAgentId(speakingAgentId);
            String lastMessage = messageService.lastMessage(chatId);

            String agentPrompt = promtToMoodAndPersonality(speakingAgentId, fullContext, agentContext, lastMessage);

            String answer = model.call(agentPrompt);

            log.info("{}Получен ответ", answer);
            messageService.save(answer, speakingAgentId, chatId);
            log.info("Ответ перешел в commit на бд ,но ещшё не закаммитился ");
            dialogHistory.add(answer);
        }

        return dialogHistory;
    }

    private String promtToMoodAndPersonality(Long agentId,
                                             String fullContext,
                                             String  agentContext,
                                             String  lastMessage) {

        AgentEntity agent = agentService.getAgent(agentId);
        String agentPrompt = String.format(
                "Вот история вашего диалога:\n%s\n\n" +
                        "Вот твои сообщения из всего диалога: %s" +
                        "Тебе сказали:\n%s\n\n " +
                        "Продолжи диалог зная что у тебя харакетер %s,а настроение %s",
                fullContext, agentContext,lastMessage,agent.getPersonality().name(),agent.getMood().name()
        );
        return agentPrompt;
    }
}
