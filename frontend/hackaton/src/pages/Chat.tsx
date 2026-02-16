import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/chat.css";

interface Agent {
    id: string;
    name: string;
    personality: string;
    memories: string;
    plans: string;
    relationship: "симпатия" | "антипатия" | "нейтралитет";
}

interface Message {
    id: number;
    author: string;
    text: string;
    time: string;
    type: "agent" | "user";
    agentId?: string;
}

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
            {/* SIDEBAR */}
            <div className="sidebar">
                <div className="logo">AI Park</div>

                <div className="nav-buttons">
                    <Link to="/chat" className="nav-btn active">
                        <svg viewBox="0 0 24 24" strokeWidth="1.5">
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25-.781 0-1.544-.094-2.273-.27-.365.326-.793.636-1.294.883-.784.39-1.684.577-2.602.637-.447.03-.835-.33-.788-.777.119-1.104.418-2.118.908-3.022C4.717 16.408 3 14.357 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                            />
                        </svg>
                        <span>чат</span>
                    </Link>

                    <Link to="/dashboard" className="nav-btn">
                        <svg viewBox="0 0 24 24" strokeWidth="1.5">
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
                            />
                        </svg>
                        <span>дашборд</span>
                    </Link>
                </div>

                <div className="profile-section">
                    <Link to="/profile" className="profile-btn active">
                        <div className="profile-avatar">
                            <svg viewBox="0 0 24 24" strokeWidth="1.5">
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0
                     3.75 3.75 0 0 1 7.5 0ZM4.501 20.118
                     a7.5 7.5 0 0 1 14.998 0A17.933
                     17.933 0 0 1 12 21.75c-2.676
                     0-5.216-.584-7.499-1.632Z"
                                />
                            </svg>
                        </div>
                        <span>профиль</span>
                    </Link>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="main-content">
                <div className="chat-page">
                    <div className="chat-header">
                        <h1>AI Park</h1>
                    </div>

                    <div className="messages-wrapper">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`message ${msg.type === "user" ? "right" : "left"}`}
                            >
                                {msg.type === "agent" && (
                                    <div
                                        className="message-avatar"
                                        onClick={() => msg.agentId && openAgentCard(msg.agentId)}
                                    />
                                )}

                                <div
                                    className={`message-content ${
                                        msg.type === "user" ? "user-message" : ""
                                    }`}
                                >
                                    <div className="message-header">
                                        <span className="message-author">{msg.author}</span>
                                        <span className="message-time">{msg.time}</span>
                                    </div>
                                    <div className="message-text">{msg.text}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="input-container">
                        <div className="input-wrapper">
                            <input
                                type="text"
                                placeholder="Написать сообщение..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                            <button className="send-btn" onClick={handleSend}>
                                Отправить
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL */}
            {selectedAgent && (
                <div className="agent-modal show" onClick={closeModal}>
                    <div
                        className="agent-modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="agent-modal-header">
                            <h2>{selectedAgent.name}</h2>
                            <button className="close-modal" onClick={closeModal}>
                                ×
                            </button>
                        </div>

                        <div className="agent-modal-body">
                            <div className="agent-section">
                                <div className="section-header">
                                    <h3>Характер</h3>
                                    <button
                                        className="change-btn"
                                        onClick={() =>
                                            setShowPersonalityList((prev) => !prev)
                                        }
                                    >
                                        Сменить
                                    </button>
                                </div>

                                <p>{selectedAgent.personality}</p>

                                {showPersonalityList && (
                                    <div className="personality-list show">
                                        <div
                                            className="personality-item"
                                            onClick={() =>
                                                changePersonality(
                                                    "Энергичный, креативный, любит генерировать идеи."
                                                )
                                            }
                                        >
                                            Энергичный, креативный
                                        </div>
                                        <div
                                            className="personality-item"
                                            onClick={() =>
                                                changePersonality(
                                                    "Спокойный, рассудительный, взвешивает решения."
                                                )
                                            }
                                        >
                                            Спокойный, рассудительный
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="agent-section">
                                <h3>Ключевые воспоминания</h3>
                                <p>{selectedAgent.memories}</p>
                            </div>

                            <div className="agent-section">
                                <h3>Текущие планы</h3>
                                <p>{selectedAgent.plans}</p>
                            </div>

                            <div className="agent-section">
                                <h3>Отношения</h3>
                                <div className="relationship-status">
                  <span className="relationship-label">
                    Симпатия/Антипатия:
                  </span>
                                    <span
                                        className={`relationship-value ${selectedAgent.relationship === "симпатия"
                                            ? "sympathy"
                                            : selectedAgent.relationship === "антипатия"
                                                ? "antipathy"
                                                : "neutral"
                                        }`}
                                    >
                    {selectedAgent.relationship}
                  </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
