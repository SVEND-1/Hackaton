import { useState } from "react";
import type { CreateChatModalProps,AgentConfig } from "../../types/chat.types";


export default function CreateChatModal({ isOpen, onClose, onCreateChat }: CreateChatModalProps) {
    const [chatName, setChatName] = useState("");
    const [agents, setAgents] = useState<AgentConfig[]>([
        {
            name: "",
            neuralNetwork: "deepseek",
            personality: "",
            mood: "Нейтральное",
            avatar: "/avatars/default1.png"
        },
        {
            name: "",
            neuralNetwork: "gamma",
            personality: "",
            mood: "Нейтральное",
            avatar: "/avatars/default2.png"
        }
    ]);

    if (!isOpen) return null;

    const personalities = [
        "Энергичный, креативный, любит генерировать идеи.",
        "Спокойный, рассудительный, взвешивает решения.",
        "Дружелюбный, отзывчивый, всегда готов помочь.",
        "Аналитический, логичный, любит точные данные.",
        "Весёлый, жизнерадостный, заряжает позитивом."
    ];

    const moods = [
        "Нейтральное",
        "Позитивное",
        "Весёлое",
        "Задумчивое",
        "Энергичное",
        "Спокойное"
    ];

    const avatars = [
        "/avatars/avatar1.png",
        "/avatars/avatar2.png",
        "/avatars/avatar3.png",
        "/avatars/avatar4.png",
        "/avatars/avatar5.png"
    ];

    const handleAgentChange = (index: number, field: keyof AgentConfig, value: string) => {
        const updatedAgents = [...agents];
        updatedAgents[index] = { ...updatedAgents[index], [field]: value };
        setAgents(updatedAgents);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!chatName.trim() || !agents[0].name.trim() || !agents[1].name.trim()) return;

        onCreateChat({
            name: chatName,
            agents: agents
        });

        // Сброс формы
        setChatName("");
        setAgents([
            {
                name: "",
                neuralNetwork: "deepseek",
                personality: "",
                mood: "Нейтральное",
                avatar: "/avatars/default1.png"
            },
            {
                name: "",
                neuralNetwork: "gamma",
                personality: "",
                mood: "Нейтральное",
                avatar: "/avatars/default2.png"
            }
        ]);
    };

    return (
        <div className="create-chat-modal" onClick={onClose}>
            <div className="create-chat-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="create-chat-modal-header">
                    <h2>Создание нового чата</h2>
                    <button className="close-modal" onClick={onClose}>×</button>
                </div>

                <div className="create-chat-modal-body">
                    <p className="modal-description">
                        Создайте новый чат с двумя нейросетями
                    </p>

                    <form onSubmit={handleSubmit}>
                        {/* Название чата */}
                        <div className="chat-name-section">
                            <h3>НАЗВАНИЕ ЧАТА</h3>
                            <input
                                type="text"
                                className="form-input chat-name-input"
                                value={chatName}
                                onChange={(e) => setChatName(e.target.value)}
                                placeholder="Введите название чата"
                                required
                            />
                        </div>

                        {/* Агент 1 */}
                        <div className="agent-section">
                            <h3>Агент 1</h3>

                            <div className="form-group">
                                <label>ИМЯ АГЕНТА</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={agents[0].name}
                                    onChange={(e) => handleAgentChange(0, 'name', e.target.value)}
                                    placeholder="Введите имя"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>МОДЕЛЬ НЕЙРОСЕТИ</label>
                                <div className="network-display">
                                    DeepSeek
                                </div>
                            </div>

                            <div className="form-group">
                                <label>ХАРАКТЕР</label>
                                <select
                                    className="form-select"
                                    value={agents[0].personality}
                                    onChange={(e) => handleAgentChange(0, 'personality', e.target.value)}
                                >
                                    <option value="">Выберите характер</option>
                                    {personalities.map((p, index) => (
                                        <option key={index} value={p}>{p}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>НАСТРОЕНИЕ</label>
                                <select
                                    className="form-select"
                                    value={agents[0].mood}
                                    onChange={(e) => handleAgentChange(0, 'mood', e.target.value)}
                                >
                                    {moods.map((m, index) => (
                                        <option key={index} value={m}>{m}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>АВАТАР</label>
                                <div className="avatar-selector">
                                    {avatars.map((ava) => (
                                        <div
                                            key={ava}
                                            className={`avatar-option ${agents[0].avatar === ava ? 'selected' : ''}`}
                                            onClick={() => handleAgentChange(0, 'avatar', ava)}
                                        >
                                            <img src={ava} alt="avatar" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Агент 2 */}
                        <div className="agent-section">
                            <h3>Агент 2</h3>

                            <div className="form-group">
                                <label>ИМЯ АГЕНТА</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={agents[1].name}
                                    onChange={(e) => handleAgentChange(1, 'name', e.target.value)}
                                    placeholder="Введите имя"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>МОДЕЛЬ НЕЙРОСЕТИ</label>
                                <div className="network-display">
                                    Gamma
                                </div>
                            </div>

                            <div className="form-group">
                                <label>ХАРАКТЕР</label>
                                <select
                                    className="form-select"
                                    value={agents[1].personality}
                                    onChange={(e) => handleAgentChange(1, 'personality', e.target.value)}
                                >
                                    <option value="">Выберите характер</option>
                                    {personalities.map((p, index) => (
                                        <option key={index} value={p}>{p}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>НАСТРОЕНИЕ</label>
                                <select
                                    className="form-select"
                                    value={agents[1].mood}
                                    onChange={(e) => handleAgentChange(1, 'mood', e.target.value)}
                                >
                                    {moods.map((m, index) => (
                                        <option key={index} value={m}>{m}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>АВАТАР</label>
                                <div className="avatar-selector">
                                    {avatars.map((ava) => (
                                        <div
                                            key={ava}
                                            className={`avatar-option ${agents[1].avatar === ava ? 'selected' : ''}`}
                                            onClick={() => handleAgentChange(1, 'avatar', ava)}
                                        >
                                            <img src={ava} alt="avatar" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="modal-actions">
                            <button type="button" className="cancel-btn" onClick={onClose}>
                                Отмена
                            </button>
                            <button type="submit" className="create-btn">
                                Создать чат
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}