export interface Agent {
    id: string;
    name: string;
    personality: string;
    memories: string;
    plans: string;
    relationship: "симпатия" | "антипатия" | "нейтралитет";
    avatar?: string;
}

export interface Message {
    id: number;
    author: string;
    text: string;
    time: string;
    type: "agent" | "user";
    agentId?: string;
    chatId?: string;
}

export interface Chat {
    id: string;
    name: string;
    avatar: string;
    agents: ChatAgent[];
    neuralNetwork: "deepseek" | "gamma";
    personality: string;
    mood: string;
    messages: Message[];
    createdAt: Date;
}

export interface AgentModalProps {
    agent: Agent;
    showPersonalityList: boolean;
    setShowPersonalityList: (value: boolean) => void;
    changePersonality: (text: string) => void;
    closeModal: () => void;
}

export interface ChatInputProps {
    input: string;
    setInput: (value: string) => void;
    handleSend: () => void;
}

export interface ChatMainContentProps {
    messages: Message[];
    input: string;
    setInput: (value: string) => void;
    handleSend: () => void;
    openAgentCard: (agentId: string) => void;
    currentChat?: Chat | null;
}

export interface MessageItemProps {
    message: Message;
    openAgentCard: (agentId: string) => void;
}

export interface MessagesListProps {
    messages: Message[];
    openAgentCard: (agentId: string) => void;
}

export interface PersonalityListProps {
    changePersonality: (text: string) => void;
}
export interface ChatAgent {
    name: string;
    neuralNetwork: "deepseek" | "gamma";
    personality: string;
    mood: string;
    avatar: string;
    id?: string;
}


export interface CreateChatModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreateChat: (chatData: { name: string; agents: ChatAgent[] }) => void;
}

export interface SendMessageResponse {
    success: boolean;
    message?: string;
    data?: {
        id: number;
        author: string;
        text: string;
        time: string;
        type: "agent" | "user";
        agentId?: string;
    };
}

export interface GetMessagesResponse {
    success: boolean;
    data: Message[];
}

export interface GetAgentsResponse {
    success: boolean;
    data: Agent[];
}
export interface ChatHeaderProps {
    chatName?: string;
}
export interface AgentConfig {
    name: string;
    neuralNetwork: "deepseek" | "gamma";
    personality: string;
    mood: string;
    avatar: string;
}