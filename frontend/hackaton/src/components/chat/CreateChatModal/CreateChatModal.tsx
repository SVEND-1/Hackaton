import { useState } from "react";
import type { CreateChatModalProps, AgentConfig } from '../../../types/chat.types.ts';
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!chatName.trim() ||
            !agents[0].name.trim() ||
            !agents[1].name.trim()
        ) return;

        onCreateChat({ name: chatName, agents });

        setChatName("");
        setAgents(initialAgents);
    };

    return (
        <div className="create-chat-modal" onClick={onClose}>
            <div
                className="create-chat-modal-content"
                onClick={(e) => e.stopPropagation()}
            >
                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        value={chatName}
                        onChange={(e) => setChatName(e.target.value)}
                        placeholder="Название чата"
                        required
                    />

                    <AgentSection
                        title="Агент 1"
                        agent={agents[0]}
                        neuralNetworkLabel="DeepSeek"
                        onChange={(field, value) =>
                            handleAgentChange(0, field, value)
                        }
                    />

                    <AgentSection
                        title="Агент 2"
                        agent={agents[1]}
                        neuralNetworkLabel="Gamma"
                        onChange={(field, value) =>
                            handleAgentChange(1, field, value)
                        }
                    />

                    <button type="submit">Создать чат</button>
                </form>
            </div>
        </div>
    );
}
