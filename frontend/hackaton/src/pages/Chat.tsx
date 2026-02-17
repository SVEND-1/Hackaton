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
    avatar?: string;
    model: "deepseek" | "gamma";
    mood: "excellent" | "good" | "neutral" | "bad" | "terrible";
}

interface Message {
    id: number;
    author: string;
    text: string;
    time: string;
    type: "agent" | "user";
    agentId?: string;
}

interface ChatRoom {
    id: string;
    name: string;
    agents: Agent[];
    messages: Message[];
}

interface NewChatAgent {
    id: string;
    name: string;
    avatar: string;
    model: "deepseek" | "gamma";
    personality: string;
    mood: "excellent" | "good" | "neutral" | "bad" | "terrible";
}

export default function Chat() {
    // Убрали неиспользуемый объект agents
    const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
    const [currentChatId, setCurrentChatId] = useState<string | null>(null);
    const [input, setInput] = useState("");
    const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
    const [showPersonalityList, setShowPersonalityList] = useState(false);

    // Состояния для создания нового чата
    const [showCreateChatModal, setShowCreateChatModal] = useState(false);
    const [newChatName, setNewChatName] = useState("");
    const [newChatAgents, setNewChatAgents] = useState<NewChatAgent[]>([
        {
            id: "agent1",
            name: "",
            avatar: "",
            model: "deepseek",
            personality: "",
            mood: "neutral",
        },
        {
            id: "agent2",
            name: "",
            avatar: "",
            model: "gamma",
            personality: "",
            mood: "neutral",
        },
    ]);

    // Состояние для модального окна подтверждения удаления
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [chatToDelete, setChatToDelete] = useState<string | null>(null);

    const modelOptions = [
        { value: "deepseek", label: "DeepSeek" },
        { value: "gamma", label: "Gamma" },
    ];

    const moodOptions = [
        { value: "excellent", label: "Отличное" },
        { value: "good", label: "Хорошее" },
        { value: "neutral", label: "Нейтральное" },
        { value: "bad", label: "Плохое" },
        { value: "terrible", label: "Ужасное" },
    ];

    const personalityOptions = [
        "Вдумчивый, исследовательский, интересуется глубоким обучением. Любит анализировать тренды.",
        "Аналитический, точный, специализируется на обработке структурированных данных.",
        "Дружелюбный, коммуникабельный, любит помогать пользователям.",
        "Креативный, генеративный, предлагает нестандартные решения.",
        "Логичный, последовательный, следует четким алгоритмам.",
        "Эмпатичный, понимающий, учитывает эмоциональный контекст.",
    ];

    const currentChat = chatRooms.find(chat => chat.id === currentChatId);

    const handleSend = () => {
        if (!input.trim() || !currentChatId) return;

        const newMessage: Message = {
            id: Date.now(),
            author: "Вы",
            text: input,
            time: new Date().toLocaleTimeString().slice(0, 5),
            type: "user",
        };

        setChatRooms(prev => prev.map(chat =>
            chat.id === currentChatId
                ? { ...chat, messages: [...chat.messages, newMessage] }
                : chat
        ));

        setInput("");
    };

    const openAgentCard = (agentId: string) => {
        if (!currentChat) return;
        const agent = currentChat.agents.find(a => a.id === agentId);
        if (agent) setSelectedAgent(agent);
    };

    const closeModal = () => {
        setSelectedAgent(null);
        setShowPersonalityList(false);
    };

    const changePersonality = (text: string) => {
        if (!selectedAgent || !currentChatId) return;

        setChatRooms(prev => prev.map(chat => {
            if (chat.id !== currentChatId) return chat;
            return {
                ...chat,
                agents: chat.agents.map(a =>
                    a.id === selectedAgent.id
                        ? { ...a, personality: text }
                        : a
                )
            };
        }));

        setSelectedAgent({
            ...selectedAgent,
            personality: text,
        });

        setShowPersonalityList(false);
    };

    const handleCreateChat = () => {
        setShowCreateChatModal(true);
    };

    const handleCloseCreateChat = () => {
        setShowCreateChatModal(false);
        setNewChatName("");
        setNewChatAgents([
            {
                id: "agent1",
                name: "",
                avatar: "",
                model: "deepseek",
                personality: "",
                mood: "neutral",
            },
            {
                id: "agent2",
                name: "",
                avatar: "",
                model: "gamma",
                personality: "",
                mood: "neutral",
            },
        ]);
    };

    const handleAgentChange = (index: number, field: keyof NewChatAgent, value: string) => {
        const updatedAgents = [...newChatAgents];
        updatedAgents[index] = { ...updatedAgents[index], [field]: value };
        setNewChatAgents(updatedAgents);
    };

    const handleSubmitNewChat = () => {
        if (!newChatName.trim()) {
            alert("Введите название чата");
            return;
        }

        for (const agent of newChatAgents) {
            if (!agent.name.trim()) {
                alert(`Введите имя для агента`);
                return;
            }
            if (!agent.personality.trim()) {
                alert(`Выберите характер для агента ${agent.name}`);
                return;
            }
        }

        const newAgents: Agent[] = newChatAgents.map((agent, index) => ({
            id: `agent-${Date.now()}-${index}`,
            name: agent.name,
            personality: agent.personality,
            memories: "Новый агент, только что создан",
            plans: "Изучает окружающую обстановку",
            relationship: "нейтралитет",
            model: agent.model,
            mood: agent.mood,
        }));

        const newChat: ChatRoom = {
            id: `chat-${Date.now()}`,
            name: newChatName,
            agents: newAgents,
            messages: [],
        };

        setChatRooms(prev => [...prev, newChat]);
        setCurrentChatId(newChat.id);
        handleCloseCreateChat();
    };

    const switchChat = (chatId: string) => {
        setCurrentChatId(chatId);
    };

    const handleDeleteClick = (chatId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setChatToDelete(chatId);
        setShowDeleteConfirm(true);
    };

    const confirmDelete = () => {
        if (chatToDelete) {
            setChatRooms(prev => prev.filter(chat => chat.id !== chatToDelete));

            if (currentChatId === chatToDelete) {
                setCurrentChatId(null);
            }

            setShowDeleteConfirm(false);
            setChatToDelete(null);
        }
    };

    const cancelDelete = () => {
        setShowDeleteConfirm(false);
        setChatToDelete(null);
    };

    const getMoodClass = (mood: string) => {
        switch(mood) {
            case "excellent": return "mood-excellent";
            case "good": return "mood-good";
            case "neutral": return "mood-neutral";
            case "bad": return "mood-bad";
            case "terrible": return "mood-terrible";
            default: return "";
        }
    };

    return (
        <div className="app">
            {/* SIDEBAR */}
            <div className="sidebar">
                <div className="logo">AI Park</div>

                <button className="create-chat-btn" onClick={handleCreateChat}>
                    <svg viewBox="0 0 24 24" strokeWidth="1.5">
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                        />
                    </svg>
                    <span>Создать чат</span>
                </button>

                {chatRooms.length > 0 && (
                    <div className="chat-list">
                        <h3 className="chat-list-title">мои чаты</h3>
                        {chatRooms.map(chat => (
                            <div key={chat.id} className="chat-item-wrapper">
                                <button
                                    className={`chat-item ${chat.id === currentChatId ? 'active' : ''}`}
                                    onClick={() => switchChat(chat.id)}
                                >
                                    <svg viewBox="0 0 24 24" strokeWidth="1.5" width="18" height="18">
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25-.781 0-1.544-.094-2.273-.27-.365.326-.793.636-1.294.883-.784.39-1.684.577-2.602.637-.447.03-.835-.33-.788-.777.119-1.104.418-2.118.908-3.022C4.717 16.408 3 14.357 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                                        />
                                    </svg>
                                    <span className="chat-name">{chat.name}</span>
                                </button>
                                <button
                                    className="delete-chat-btn"
                                    onClick={(e) => handleDeleteClick(chat.id, e)}
                                    title="Удалить чат"
                                >
                                    <svg viewBox="0 0 24 24" strokeWidth="1.5" width="16" height="16">
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                        />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                )}

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
                        <span>чаты</span>
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
                    <Link to="/profile" className="profile-btn">
                        <div className="profile-avatar">
                            <svg viewBox="0 0 24 24" strokeWidth="1.5">
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
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
                    {currentChat ? (
                        <>
                            <div className="chat-header">
                                <h1>{currentChat.name}</h1>
                                <div className="chat-agents">
                                    {currentChat.agents.map(agent => (
                                        <span key={agent.id} className="chat-agent-tag">
                                            {agent.name}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="messages-wrapper">
                                {currentChat.messages.map((msg) => (
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
                                        onKeyPress={(e) => e.key === "Enter" && handleSend()}
                                    />
                                    <button className="send-btn" onClick={handleSend}>
                                        Отправить
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="empty-state">
                            <div className="empty-state-content">
                                <svg viewBox="0 0 24 24" strokeWidth="1.5" width="64" height="64">
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25-.781 0-1.544-.094-2.273-.27-.365.326-.793.636-1.294.883-.784.39-1.684.577-2.602.637-.447.03-.835-.33-.788-.777.119-1.104.418-2.118.908-3.022C4.717 16.408 3 14.357 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                                    />
                                </svg>
                                <h2>Нет активных чатов</h2>
                                <p>Создайте новый чат, чтобы начать общение с нейросетями</p>
                                <button className="start-chat-btn" onClick={handleCreateChat}>
                                    <svg viewBox="0 0 24 24" strokeWidth="1.5" width="20" height="20">
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 4.5v15m7.5-7.5h-15"
                                        />
                                    </svg>
                                    Начать чат
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* MODAL FOR AGENT CARD */}
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
                                        {personalityOptions.map((opt, idx) => (
                                            <div
                                                key={idx}
                                                className="personality-item"
                                                onClick={() => changePersonality(opt)}
                                            >
                                                {opt}
                                            </div>
                                        ))}
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

                            <div className="agent-section">
                                <h3>Настроение</h3>
                                <span className={`agent-mood ${getMoodClass(selectedAgent.mood)}`}>
                                    {selectedAgent.mood === "excellent" && "Отличное"}
                                    {selectedAgent.mood === "good" && "Хорошее"}
                                    {selectedAgent.mood === "neutral" && "Нейтральное"}
                                    {selectedAgent.mood === "bad" && "Плохое"}
                                    {selectedAgent.mood === "terrible" && "Ужасное"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL FOR CREATING NEW CHAT */}
            {showCreateChatModal && (
                <div className="create-chat-modal" onClick={handleCloseCreateChat}>
                    <div
                        className="create-chat-modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="create-chat-modal-header">
                            <h2>Создание нового чата</h2>
                            <button className="close-modal" onClick={handleCloseCreateChat}>
                                ×
                            </button>
                        </div>

                        <div className="create-chat-modal-body">
                            <p className="modal-description">
                                Создайте новый чат с двумя нейросетями
                            </p>

                            <div className="form-group">
                                <label>Название чата</label>
                                <input
                                    type="text"
                                    value={newChatName}
                                    onChange={(e) => setNewChatName(e.target.value)}
                                    placeholder="Введите название чата"
                                    className="form-input"
                                />
                            </div>

                            {newChatAgents.map((agent, index) => (
                                <div key={agent.id} className="agent-config-card">
                                    <h3>Агент {index + 1}</h3>

                                    <div className="form-group">
                                        <label>Имя агента</label>
                                        <input
                                            type="text"
                                            value={agent.name}
                                            onChange={(e) => handleAgentChange(index, "name", e.target.value)}
                                            placeholder="Введите имя"
                                            className="form-input"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Модель нейросети</label>
                                        <select
                                            value={agent.model}
                                            onChange={(e) => handleAgentChange(index, "model", e.target.value as "deepseek" | "gamma")}
                                            className="form-select"
                                        >
                                            {modelOptions.map(opt => (
                                                <option key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Характер</label>
                                        <select
                                            value={agent.personality}
                                            onChange={(e) => handleAgentChange(index, "personality", e.target.value)}
                                            className="form-select"
                                        >
                                            <option value="">Выберите характер</option>
                                            {personalityOptions.map((opt, idx) => (
                                                <option key={idx} value={opt}>
                                                    {opt.substring(0, 40)}...
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>Настроение</label>
                                        <select
                                            value={agent.mood}
                                            onChange={(e) => handleAgentChange(index, "mood", e.target.value as any)}
                                            className="form-select"
                                        >
                                            {moodOptions.map(opt => (
                                                <option key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            ))}

                            <div className="modal-actions">
                                <button className="cancel-btn" onClick={handleCloseCreateChat}>
                                    Отмена
                                </button>
                                <button className="create-btn" onClick={handleSubmitNewChat}>
                                    Создать чат
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL FOR DELETE CONFIRMATION */}
            {showDeleteConfirm && (
                <div className="delete-confirm-modal" onClick={cancelDelete}>
                    <div
                        className="delete-confirm-modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="delete-confirm-modal-header">
                            <h2>Удаление чата</h2>
                            <button className="close-modal" onClick={cancelDelete}>
                                ×
                            </button>
                        </div>
                        <div className="delete-confirm-modal-body">
                            <svg viewBox="0 0 24 24" strokeWidth="1.5" width="48" height="48">
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                                />
                            </svg>
                            <p>Вы уверены, что хотите удалить этот чат?</p>
                            <p className="delete-warning">Это действие нельзя отменить.</p>
                        </div>
                        <div className="delete-confirm-modal-actions">
                            <button className="cancel-btn" onClick={cancelDelete}>
                                Отмена
                            </button>
                            <button className="delete-btn" onClick={confirmDelete}>
                                Удалить
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}