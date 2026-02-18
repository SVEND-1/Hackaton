import { axiosInstance } from "./axiosInstance";

export interface AgentDTO {
    id: number;
    name: string;
}

export interface ChatResponse {
    name: string;
    agentChatResponse1: any;
    agentChatResponse2: any;
}

export const chatApi = {

    async createChat(
        name: string,
        agents: AgentDTO[],
        agentPhoto1: File,
        agentPhoto2: File
    ): Promise<boolean> {

        const formData = new FormData();

        formData.append("name", name);

        // ⚠️ agents нужно сериализовать вручную
        formData.append(
            "agents",
            new Blob([JSON.stringify(agents)], {
                type: "application/json"
            })
        );

        formData.append("agentPhoto1", agentPhoto1);
        formData.append("agentPhoto2", agentPhoto2);

        const response = await axiosInstance.post(
            "/chats",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );

        return response.data;
    },

    async getChatById(id: number): Promise<ChatResponse> {
        const response = await axiosInstance.get(`/chats/${id}`);
        return response.data;
    }
};
