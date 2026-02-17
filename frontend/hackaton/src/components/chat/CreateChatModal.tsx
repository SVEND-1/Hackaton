import { useState } from "react";
import type { CreateChatModalProps } from "../../types/chat.types";

export default function CreateChatModal({ isOpen, onClose, onCreateChat }: CreateChatModalProps) {
    const [chatName, setChatName] = useState("");
    const [avatar, setAvatar] = useState("/avatars/default.png");
    const [neuralNetwork, setNeuralNetwork] = useState<"deepseek" | "gamma">("deepseek");
    const [personality, setPersonality] = useState("");
    const [mood, setMood] = useState("");

    if (!isOpen) return null;

    const personalities = [
        "Энергичный, креативный, любит генерировать идеи.",
        "Спокойный, рассудительный, взвешивает решения.",
        "Дружелюбный, отзывчивый, всегда готов помочь.",
        "Аналитический, логичный, любит точные данные.",
        "Весёлый, жизнерадостный, заряжает позитивом."
    ];

    const moods = [
        "Сегодня я полон энергии!",
        "Немного устал, но готов помочь.",
        "В отличном расположении духа!",
        "Задумчивый и философский настрой.",
        "Радостный и общительный."
    ];

    const avatars = [
        "/avatars/avatar1.png",
        "/avatars/avatar2.png",
        "/avatars/avatar3.png",
        "/avatars/avatar4.png",
        "/avatars/avatar5.png"
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!chatName.trim() || !personality || !mood) return;

        onCreateChat({
            name: chatName,
            avatar,
            neuralNetwork,
            personality,
            mood
        });

        // Сброс формы
        setChatName("");
        setAvatar("/avatars/default.png");
        setNeuralNetwork("deepseek");
        setPersonality("");
        setMood("");
    };

    return (
        <div className="create-chat-modal" onClick={onClose}>
            <div className="create-chat-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="create-chat-modal-header">
                    <h2>Создать новый чат</h2>
                    <button className="close-modal" onClick={onClose}>×</button>
                </div>

                <div className="create-chat-modal-body">
                    <p className="modal-description">
                        Настройте персонального AI-ассистента под свои задачи.
                        Выберите имя, характер и настроение для вашего чата.
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div className="agent-config-card">
                            <h3>Основная информация</h3>

                            <div className="form-group">
                                <label>Имя чата *</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={chatName}
                                    onChange={(e) => setChatName(e.target.value)}
                                    placeholder="Введите имя чата"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Аватарка</label>
                                <div className="avatar-selector">
                                    {avatars.map((ava) => (
                                        <div
                                            key={ava}
                                            className={`avatar-option ${avatar === ava ? 'selected' : ''}`}
                                            onClick={() => setAvatar(ava)}
                                        >
                                            <img src={ava} alt="avatar" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Нейросеть</label>
                                <div className="network-selector">
                                    <label className="radio-label">
                                        <input
                                            type="radio"
                                            name="network"
                                            value="deepseek"
                                            checked={neuralNetwork === "deepseek"}
                                            onChange={(e) => setNeuralNetwork(e.target.value as "deepseek")}
                                        />
                                        DeepSeek
                                    </label>
                                    <label className="radio-label">
                                        <input
                                            type="radio"
                                            name="network"
                                            value="gamma"
                                            checked={neuralNetwork === "gamma"}
                                            onChange={(e) => setNeuralNetwork(e.target.value as "gamma")}
                                        />
                                        Gamma
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="agent-config-card">
                            <h3>Характер и настроение</h3>

                            <div className="form-group">
                                <label>Характер *</label>
                                <select
                                    className="form-select"
                                    value={personality}
                                    onChange={(e) => setPersonality(e.target.value)}
                                    required
                                >
                                    <option value="">Выберите характер</option>
                                    {personalities.map((p, index) => (
                                        <option key={index} value={p}>{p}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Настроение *</label>
                                <select
                                    className="form-select"
                                    value={mood}
                                    onChange={(e) => setMood(e.target.value)}
                                    required
                                >
                                    <option value="">Выберите настроение</option>
                                    {moods.map((m, index) => (
                                        <option key={index} value={m}>{m}</option>
                                    ))}
                                </select>
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