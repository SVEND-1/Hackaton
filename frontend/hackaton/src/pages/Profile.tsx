import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/profile.css";
import { logout } from "../api/authApi";

interface UserProfile {
    fullName: string;
    username: string;
    email: string;
    role: string;
    stats: {
        messages: number;
        chats: number;
        days: number;
        rating: number;
    };
}

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
            <div className="sidebar">
                <div className="logo">AI Park</div>

                <div className="nav-buttons">
                    <Link to="/chat" className="nav-btn">
                        <svg viewBox="0 0 24 24" strokeWidth="1.5">
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25-.781 0-1.544-.094-2.273-.27-.365.326-.793.636-1.294.883-.784.39-1.684.577-2.602.637-.447.03-.835-.33-.788-.777.119-1.104.418-2.118.908-3.022C4.717 16.408 3 14.357 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                            />
                        </svg>
                        <span>чат</span>
                    </Link>

                    <Link to="/dashboard" className="nav-btn">
                        <svg viewBox="0 0 24 24" strokeWidth="1.5">
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
                            />
                        </svg>
                        <span>дашборд</span>
                    </Link>
                </div>

                <div className="profile-section">
                    <button onClick={handleLogout} className="profile-btn">
                        <span>выйти</span>
                    </button>
                </div>
            </div>

            <div className="main-content">
                <div className="profile-page">
                    <div className="profile-header">
                        <h1>Профиль</h1>
                        <p>личная информация и статистика</p>
                    </div>

                    <div className="profile-grid">
                        <div className="profile-left">
                            <div className="profile-name">{user.fullName}</div>
                            <div className="profile-role">{user.role}</div>

                            <div className="profile-info-section">
                                <div className="profile-info-item">
                                    <span className="profile-info-label">Имя пользователя</span>
                                    <span className="profile-info-value">
                    {user.username}
                  </span>
                                </div>

                                <div className="profile-info-item">
                                    <span className="profile-info-label">Email</span>
                                    <span className="profile-info-value">
                    {user.email}
                  </span>
                                </div>
                            </div>
                        </div>

                        <div className="profile-right">
                            <div className="stats-grid">
                                <div className="stat-item">
                                    <div className="stat-number">
                                        {user.stats.messages}
                                    </div>
                                    <div className="stat-label">сообщений</div>
                                </div>

                                <div className="stat-item">
                                    <div className="stat-number">
                                        {user.stats.chats}
                                    </div>
                                    <div className="stat-label">чатов</div>
                                </div>

                                <div className="stat-item">
                                    <div className="stat-number">
                                        {user.stats.days}
                                    </div>
                                    <div className="stat-label">дней</div>
                                </div>

                                <div className="stat-item">
                                    <div className="stat-number">
                                        {user.stats.rating}
                                    </div>
                                    <div className="stat-label">рейтинг</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
