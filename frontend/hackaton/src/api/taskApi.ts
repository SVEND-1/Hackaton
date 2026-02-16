import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080/api",
    withCredentials: true,
});

export interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

export const getTasks = () =>
    API.get<Task[]>("/tasks");

export const createTask = (title: string, description: string) =>
    API.post<Task>("/tasks", { title, description });

export const updateTask = (id: number, title: string, description: string) =>
    API.put<Task>("/tasks", { id, title, description });

export const completeTask = (id: number) =>
    API.put<Task>(`/tasks/${id}/completed`);

export const uncompleteTask = (id: number) =>
    API.put<Task>(`/tasks/${id}/uncompleted`);

export const deleteTask = (id: number) =>
    API.delete(`/tasks/${id}`);
