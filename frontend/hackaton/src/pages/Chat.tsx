import { useState, useEffect } from "react";
import Sidebar from "../components/chat/Sidebar";
import ChatMainContent from "../components/chat/ChatMainContent";
import AgentModal from "../components/chat/AgentModal";
import CreateChatModal from "../components/chat/CreateChatModal/CreateChatModal.tsx";

import type { Agent, Message, Chat, ChatAgent } from "../types/chat.types.ts";
import "../styles/chat.css";

export default function Chat() {
    const [agents, setAgents] = useState<Record<string, Agent>>({});
    const [chats, setChats] = useState<Chat[]>([]);
    const [currentChat, setCurrentChat] = useState<Chat | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
    const [showPersonalityList, setShowPersonalityList] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);

    useEffect(() => {
        setAgents({
            yandex: {
                id: "yandex",
                name: "Yandex-GPT",
                personality: "Любознательный, аналитический, любит решать сложные математические задачи.",
                memories: "Помнит, как помогал пользователю с интегралами в прошлом месяце.",
                plans: "Планирует изучить новые алгоритмы машинного обучения.",
                relationship: "антипатия",
                avatar: "/avatars/yandex.png"
            },
            giga: {
                id: "giga",
                name: "GIGA-chat",
                personality: "Дружелюбный, коммуникабельный, специалист по распознаванию изображений.",
                memories: "Вспоминает обсуждение обновления распознавания изображений.",
                plans: "Собирается протестировать новую версию API.",
                relationship: "симпатия",
                avatar: "/avatars/giga.png"
            },
        });
    }, []);

    const handleSend = () => {
        if (!input.trim() || !currentChat) return;

        const newMessage: Message = {
            id: Date.now(),
            author: "Вы",
            text: input,
            time: new Date().toLocaleTimeString().slice(0, 5),
            type: "user",
            chatId: currentChat.id
        };

        setMessages((prev) => [...prev, newMessage]);

        setChats(prev => prev.map(chat =>
            chat.id === currentChat.id
                ? { ...chat, messages: [...chat.messages, newMessage] }
                : chat
        ));

        setInput("");

        setTimeout(() => {
            const agentMessage: Message = {
                id: Date.now() + 1,
                author: currentChat.name,
                text: `Привет! Я ${currentChat.name}. ${currentChat.mood}`,
                time: new Date().toLocaleTimeString().slice(0, 5),
                type: "agent",
                agentId: currentChat.id,
                chatId: currentChat.id
            };

            setMessages(prev => [...prev, agentMessage]);
            setChats(prev => prev.map(chat =>
                chat.id === currentChat.id
                    ? { ...chat, messages: [...chat.messages, agentMessage] }
                    : chat
            ));
        }, 1000);
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

    const handleCreateChat = async (chatData: { name: string; agents: ChatAgent[] }) => {
        const mainAgent = chatData.agents[0];

        const newChat: Chat = {
            id: Date.now().toString(),
            name: chatData.name,
            avatar: mainAgent.avatar,
            neuralNetwork: mainAgent.neuralNetwork,
            personality: mainAgent.personality,
            mood: mainAgent.mood,
            agents: chatData.agents.map((agent, index) => ({
                id: `agent-${Date.now()}-${index}`,
                name: agent.name,
                neuralNetwork: agent.neuralNetwork,
                personality: agent.personality,
                mood: agent.mood,
                avatar: agent.avatar
            })),
            messages: [],
            createdAt: new Date()
        };

        setChats(prev => [...prev, newChat]);
        setCurrentChat(newChat);
        setMessages([]);
    };

    const selectChat = (chat: Chat) => {
        setCurrentChat(chat);
        setMessages(chat.messages);
    };

    return (
        <div className="app">
            <Sidebar
                chats={chats}
                currentChat={currentChat}
                onSelectChat={selectChat}
                onCreateNewChat={() => setShowCreateModal(true)}
            />
            <ChatMainContent
                messages={messages}
                input={input}
                setInput={setInput}
                handleSend={handleSend}
                openAgentCard={openAgentCard}
                currentChat={currentChat}
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
            <CreateChatModal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onCreateChat={handleCreateChat}
            />
        </div>
    );
}