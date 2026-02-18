import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080/api/users",
    withCredentials: true,
});

// добавляем JWT в каждый запрос
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export interface UserDTO {
    id: string;
    email: string;
    name: string;
    role: string;
}

export const getCurrentUser = () =>
    API.get<UserDTO>("");
