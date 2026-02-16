import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/authApi";
import Sidebar from "../components/Dashboard/Sidebar";
import ProfileContent from "../components/profile/ProfileContent";
import type {UserProfile} from "../types/profile.types";
import "../styles/profile.css";

export default function Profile() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/");
        } catch (error) {
            alert("Ошибка выхода");
        }
    };

    const [user] = useState<UserProfile>({
        fullName: "Александр Петров",
        username: "alex_petrov",
        email: "alex@example.com",
        role: "Пользователь",
        stats: {
            messages: 247,
            chats: 12,
            days: 5,
            rating: 4.8,
        },
    });

    return (
        <div className="app">
            <Sidebar
                onLogout={handleLogout}
                activePath="/profile"
            />
            <ProfileContent user={user} />
        </div>
    );
}