import { useEffect, useState } from "react";
import {
    getTasks,
    createTask,
    deleteTask,
    completeTask,
    uncompleteTask,
    type Task,
} from "../api/taskApi";
import "../styles/dashboard.css";

export default function Dashboard() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const loadTasks = async () => {
        const response = await getTasks();
        setTasks(response.data);
    };

    useEffect(() => {
        loadTasks();
    }, []);

    const handleCreate = async () => {
        if (!title || !description) return;

        await createTask(title, description);
        setTitle("");
        setDescription("");
        loadTasks();
    };

    const handleDelete = async (id: number) => {
        await deleteTask(id);
        loadTasks();
    };

    const toggleComplete = async (task: Task) => {
        if (task.completed) {
            await uncompleteTask(task.id);
        } else {
            await completeTask(task.id);
        }
        loadTasks();
    };

    return (
        <div className="dashboard-container">
            <h1>My Todo List</h1>

            <div className="task-form">
                <input
                    type="text"
                    placeholder="Название задачи"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Описание"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button onClick={handleCreate}>Добавить</button>
            </div>

            <div className="task-list">
                {tasks.map((task) => (
                    <div
                        key={task.id}
                        className={`task-card ${task.completed ? "completed" : ""}`}
                    >
                        <div>
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
                        </div>

                        <div className="task-actions">
                            <button onClick={() => toggleComplete(task)}>
                                {task.completed ? "↩" : "✔"}
                            </button>
                            <button onClick={() => handleDelete(task.id)}>🗑</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
