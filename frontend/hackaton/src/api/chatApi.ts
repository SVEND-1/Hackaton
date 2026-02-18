import type {CreateChatRequest, ChatResponse} from '../types/chat.types';

const API_BASE_URL = 'http://localhost:8080/api';

export const chatApi = {
    async getChat(id: number): Promise<ChatResponse> {
        const response = await fetch(`${API_BASE_URL}/chats/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch chat');
        }
        return response.json();
    },

    async createChat(request: CreateChatRequest): Promise<boolean> {
        const formData = new FormData();
        formData.append('name', request.name);
        formData.append('agents', JSON.stringify(request.agents));

        if (request.agentPhoto1) {
            formData.append('agentPhoto1', request.agentPhoto1);
        }
        if (request.agentPhoto2) {
            formData.append('agentPhoto2', request.agentPhoto2);
        }

        const response = await fetch(`${API_BASE_URL}/chats`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to create chat');
        }

        return response.json();
    }
};