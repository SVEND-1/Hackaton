import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/authApi";
import { getCurrentUser, type UserDTO } from "../api/userApi";
import Sidebar from "../components/Dashboard/Sidebar";
import ProfileContent from "../components/profile/ProfileContent";
import type { UserProfile } from "../types/profile.types";
import "../styles/profile.css";

export default function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState<UserProfile | null>(null);

    const handleLogout = async () => {
        try {
            await logout();
            localStorage.removeItem("token");
            navigate("/");
        } catch (error) {
            alert("Ошибка выхода");
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getCurrentUser();
                const data: UserDTO = response.data;

                // адаптируем backend DTO к твоему UserProfile
                const mappedUser: UserProfile = {
                    fullName: data.name,
                    username: data.email.split("@")[0],
                    email: data.email,
                    role: data.role,
                    stats: {
                        messages: 0,
                        chats: 0,
                        days: 0,
                        rating: 0,
                    },
                };

                setUser(mappedUser);

            } catch (error) {
                console.error(error);
                localStorage.removeItem("token");
                navigate("/");
            }
        };

        fetchUser();
    }, [navigate]);

    if (!user) {
        return <div className="app">Загрузка...</div>;
    }

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
