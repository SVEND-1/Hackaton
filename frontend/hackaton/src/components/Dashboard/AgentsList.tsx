import AgentItem from "./AgentItem";

const agentsData = [
    { name: "Yandex-GPT", avatar: "YG", messages: 247, mood: "хорошее", moodClass: "mood-good" },
    { name: "GIGA-chat", avatar: "GC", messages: 198, mood: "нормальное", moodClass: "mood-neutral" },
    { name: "Chat-gpt", avatar: "CG", messages: 312, mood: "отличное", moodClass: "mood-excellent" },
    { name: "DeepSeek", avatar: "DS", messages: 156, mood: "плохое", moodClass: "mood-bad" },
    { name: "Нейросеть-5", avatar: "N5", messages: 89, mood: "ужасное", moodClass: "mood-terrible" }
];

export default function AgentsList() {
    return (
        <div className="agents-list">
            {agentsData.map((agent, index) => (
                <AgentItem key={index} {...agent} />
            ))}
        </div>
    );
}