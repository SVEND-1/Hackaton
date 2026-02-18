import { useState } from "react";
import type { CreateChatModalProps, AgentConfig } from '../../../types/chat.types.ts';
import { chatApi } from '../../../api/chatApi';
import AgentSection from "./AgentSection";

export default function CreateChatModal({
    isOpen,
    onClose,
    onCreateChat
}: CreateChatModalProps) {

    const initialAgents: AgentConfig[] = [
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
    ];

    const [chatName, setChatName] = useState("");
    const [agents, setAgents] = useState<AgentConfig[]>(initialAgents);
    const [photo1, setPhoto1] = useState<File | null>(null);
    const [photo2, setPhoto2] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleAgentChange = (
        index: number,
        field: keyof AgentConfig,
        value: string
    ) => {
        setAgents(prev =>
            prev.map((agent, i) =>
                i === index ? { ...agent, [field]: value } : agent
            )
        );
    };

    const handlePhotoChange = (index: number, file: File | null) => {
        if (index === 0) {
            setPhoto1(file);
        } else {
            setPhoto2(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!chatName.trim() ||
            !agents[0].name.trim() ||
            !agents[1].name.trim() ||
            !agents[0].personality ||
            !agents[1].personality
        ) {
            setError('Пожалуйста, заполните все обязательные поля');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            // Подготавливаем агентов для отправки (без фото)
            const agentsForRequest = agents.map(agent => ({
                name: agent.name,
                neuralNetwork: agent.neuralNetwork,
                personality: agent.personality,
                mood: agent.mood,
                avatar: agent.avatar
            }));

            const success = await chatApi.createChat({
                name: chatName,
                agents: agentsForRequest,
                agentPhoto1: photo1 || undefined,
                agentPhoto2: photo2 || undefined
            });

            if (success) {
                // После успешного создания на бэкенде, вызываем локальный onCreateChat
                onCreateChat({ name: chatName, agents });

                // Сбрасываем форму
                setChatName("");
                setAgents(initialAgents);
                setPhoto1(null);
                setPhoto2(null);
                onClose();
            }
        } catch (err) {
            setError('Ошибка при создании чата. Пожалуйста, попробуйте снова.');
            console.error('Create chat error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="create-chat-modal" onClick={onClose}>
            <div
                className="create-chat-modal-content"
                onClick={(e) => e.stopPropagation()}
            >
                <form onSubmit={handleSubmit}>
                    <h2>Создание нового чата</h2>

                    {error && <div className="error-message">{error}</div>}

                    <div className="form-group">
                        <label>НАЗВАНИЕ ЧАТА</label>
                        <input
                            type="text"
                            value={chatName}
                            onChange={(e) => setChatName(e.target.value)}
                            placeholder="Введите название чата"
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <AgentSection
                        title="Агент 1"
                        agent={agents[0]}
                        neuralNetworkLabel="DeepSeek"
                        onChange={(field, value) =>
                            handleAgentChange(0, field, value)
                        }
                        onPhotoChange={(file) => handlePhotoChange(0, file)}
                    />

                    <AgentSection
                        title="Агент 2"
                        agent={agents[1]}
                        neuralNetworkLabel="Gamma"
                        onChange={(field, value) =>
                            handleAgentChange(1, field, value)
                        }
                        onPhotoChange={(file) => handlePhotoChange(1, file)}
                    />

                    <div className="modal-actions">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isLoading}
                        >
                            Отмена
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Создание...' : 'Создать чат'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}