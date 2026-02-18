import { axiosInstance } from "./axiosInstance";
import type { AgentConfig } from "../types/chat.types.ts";

export interface ChatResponse {
    id: number;
    name: string;
    agents: AgentConfig[];
}

export const chatApi = {
    getAllChats: async (): Promise<ChatResponse[]> => {
        const response = await axiosInstance.get("/chats");
        return response.data;
    },

    getChat: async (id: number): Promise<ChatResponse> => {
        const response = await axiosInstance.get(`/chats/${id}`);
        return response.data;
    },

    createChat: async (name: string, agents: AgentConfig[]): Promise<ChatResponse> => {
        try {
            // Преобразуем агентов в формат, который Spring Boot умеет читать
            const agentsJson = JSON.stringify(agents.map(a => ({
                name: a.name,
                avatar: a.avatar || "",
                personality: a.personality, // уже enum string
            })));

            const formData = new FormData();
            formData.append("name", name);
            formData.append("agents", new Blob([agentsJson], { type: "application/json" }));

            const response = await axiosInstance.post("/chats", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            return response.data;
        } catch (err) {
            console.error("Create chat error:", err);
            throw err;
        }
    },
};
