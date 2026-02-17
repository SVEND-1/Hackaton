import { useState } from "react";
import Sidebar from "../components/chat/Sidebar";
import ChatMainContent from "../components/chat/ChatMainContent";
import AgentModal from "../components/chat/AgentModal";
import type {Agent, Message} from "../types/chat.types.ts";

import "../styles/chat.css";

export default function Chat() {
    const [agents, setAgents] = useState<Record<string, Agent>>({
        yandex: {
            id: "yandex",
            name: "Yandex-GPT",
            personality:
                "Любознательный, аналитический, любит решать сложные математические задачи.",
            memories:
                "Помнит, как помогал пользователю с интегралами в прошлом месяце.",
            plans:
                "Планирует изучить новые алгоритмы машинного обучения.",
            relationship: "антипатия",
        },
        giga: {
            id: "giga",
            name: "GIGA-chat",
            personality:
                "Дружелюбный, коммуникабельный, специалист по распознаванию изображений.",
            memories:
                "Вспоминает обсуждение обновления распознавания изображений.",
            plans:
                "Собирается протестировать новую версию API.",
            relationship: "симпатия",
        },
    });

    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            author: "Yandex-GPT",
            text: "Привет всем! Как дела?",
            time: "14:30",
            type: "agent",
            agentId: "yandex",
        },
        {
            id: 2,
            author: "Вы",
            text: "Все отлично 🙂",
            time: "14:31",
            type: "user",
        },
    ]);

    const [input, setInput] = useState("");
    const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
    const [showPersonalityList, setShowPersonalityList] = useState(false);

    const handleSend = () => {
        if (!input.trim()) return;

        const newMessage: Message = {
            id: Date.now(),
            author: "Вы",
            text: input,
            time: new Date().toLocaleTimeString().slice(0, 5),
            type: "user",
        };

        setMessages((prev) => [...prev, newMessage]);
        setInput("");
    };

    const openAgentCard = (agentId: string) => {
        const agent = agents[agentId];
        if (agent) setSelectedAgent(agent);
    };

    const closeModal = () => {
        setSelectedAgent(null);
        setShowPersonalityList(false);
    };

    const changePersonality = (text: string) => {
        if (!selectedAgent) return;

        setAgents((prev) => ({
            ...prev,
            [selectedAgent.id]: {
                ...selectedAgent,
                personality: text,
            },
        }));

        setSelectedAgent({
            ...selectedAgent,
            personality: text,
        });

        setShowPersonalityList(false);
    };

    return (
        <div className="app">
            <Sidebar />
            <ChatMainContent
                messages={messages}
                input={input}
                setInput={setInput}
                handleSend={handleSend}
                openAgentCard={openAgentCard}
            />
            {selectedAgent && (
                <AgentModal
                    agent={selectedAgent}
                    showPersonalityList={showPersonalityList}
                    setShowPersonalityList={setShowPersonalityList}
                    changePersonality={changePersonality}
                    closeModal={closeModal}
                />
            )}
        </div>
    );
}