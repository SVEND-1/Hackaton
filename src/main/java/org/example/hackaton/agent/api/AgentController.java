package org.example.hackaton.agent.api;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.example.hackaton.agent.db.AgentEntity;
import org.example.hackaton.agent.domain.AgentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/agents")
@RequiredArgsConstructor
@Tag(name = "Агенты", description = "Управление AI-агентами")
public class AgentController {

    private final AgentService agentService;


//    @PostMapping("/init")
//    @Operation(summary = "Инициализация агентов",
//            description = "Создает трех тестовых агентов в системе")
//    @ApiResponse(responseCode = "200", description = "Агенты успешно созданы")
//    public String init() {
//        agentService.initAgents();
//        return "Агенты созданы и сохранены в БД";
//    }
//
//    @GetMapping
//    @Operation(summary = "Получить всех агентов",
//            description = "Возвращает список всех агентов с их воспоминаниями и отношениями")
//    @ApiResponse(responseCode = "200", description = "Список агентов получен")
//    public List<AgentEntity> getAllAgents() {
//        return agentService.getAllAgents();
//    }
//
//    @GetMapping("/{id}")
//    @Operation(summary = "Получить агента по ID",
//            description = "Возвращает детальную информацию об агенте")
//    @ApiResponses(value = {
//            @ApiResponse(responseCode = "200", description = "Агент найден"),
//            @ApiResponse(responseCode = "404", description = "Агент не найден")
//    })
//    public AgentEntity getAgent(
//            @Parameter(description = "ID агента", example = "1")
//            @PathVariable Long id) {
//        return agentService.getAgent(id);
//    }
//
//    @PostMapping("/{id}/act")
//    @Operation(summary = "Заставить агента действовать",
//            description = "Агент совершает случайное действие (взаимодействует с другим агентом)")
//    public String act(
//            @Parameter(description = "ID агента", example = "1")
//            @PathVariable Long id) {
//        return agentService.act(id);
//    }
//
//    @PostMapping("/interact")
//    @Operation(summary = "Взаимодействие агентов",
//            description = "Два агента общаются друг с другом")
//    public String interact(
//            @Parameter(description = "ID отправителя", example = "1")
//            @RequestParam Long from,
//            @Parameter(description = "ID получателя", example = "2")
//            @RequestParam Long to) {
//        return agentService.interact(from, to);
//    }
//
//    @GetMapping("/events")
//    @Operation(summary = "Лента событий",
//            description = "Получить последние события в мире агентов")
//    public List<String> getEvents() {
//        return agentService.getEventLog();
//    }
//
//    @PostMapping("/event")
//    @Operation(summary = "Добавить мировое событие",
//            description = "Добавляет событие, которое запоминают все агенты")
//    public String addWorldEvent(
//            @Parameter(description = "Описание события", example = "Найден клад!")
//            @RequestParam String event) {
//        List<AgentEntity> agents = agentService.getAllAgents();
//        for (AgentEntity agent : agents) {
//            agentService.addMemory(agent.getId(),
//                    "Событие в мире: " + event, 0.9, agent.getMood());
//        }
//        return "Событие добавлено всем агентам";
//    }
//
//    @DeleteMapping("/{id}/memories/summarize")
//    @Operation(summary = "Суммаризировать воспоминания",
//            description = "Принудительно запускает суммаризацию старых воспоминаний агента")
//    public String summarizeMemories(
//            @Parameter(description = "ID агента", example = "1")
//            @PathVariable Long id) {
//        agentService.summarizeMemories(id);
//        return "Воспоминания агента " + id + " суммаризированы";
//    }

}