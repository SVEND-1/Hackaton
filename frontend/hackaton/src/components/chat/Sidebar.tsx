import { Link, useLocation } from "react-router-dom";
import Logo from "../Dashboard/Logo";
import ProfileSection from "../Dashboard/ProfileSection";
import ChatIcon from "../icons/ChatIcon";
import DashboardIcon from "../icons/DashboardIcon";
import type { Chat } from "../../types/chat.types";

interface SidebarProps {
    chats: Chat[];
    currentChat: Chat | null;
    onSelectChat: (chat: Chat) => void;
    onCreateNewChat: () => void;
}

export default function Sidebar({ chats, currentChat, onSelectChat, onCreateNewChat }: SidebarProps) {
    const location = useLocation();

    return (
        <div className="sidebar">
            <Logo />
            <div className="nav-buttons">
                <Link
                    to="/chat"
                    className={`nav-btn ${location.pathname === "/chat" ? "active" : ""}`}
                >
                    <ChatIcon />
                    <span>чат</span>
                </Link>

                <Link
                    to="/dashboard"
                    className={`nav-btn ${location.pathname === "/dashboard" ? "active" : ""}`}
                >
                    <DashboardIcon />
                    <span>дашборд</span>
                </Link>
            </div>

            <div className="chats-section">
                <div className="chats-header">
                    <h3>Мои чаты</h3>
                    <button className="create-chat-btn" onClick={onCreateNewChat}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        <span>Новый чат</span>
                    </button>
                </div>

                <div className="chats-list">
                    {chats.length === 0 ? (
                        <div className="no-chats">
                            <div className="no-chats-icon">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
                                          stroke="url(#noChatsGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <defs>
                                        <linearGradient id="noChatsGradient" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#5900ff"/>
                                            <stop offset="1" stopColor="#ff6600"/>
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                            <p>Нет активных чатов</p>
                            <button className="create-first-chat" onClick={onCreateNewChat}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                                Создать первый чат
                            </button>
                        </div>
                    ) : (
                        chats.map(chat => (
                            <div
                                key={chat.id}
                                className={`chat-item ${currentChat?.id === chat.id ? 'active' : ''}`}
                                onClick={() => onSelectChat(chat)}
                            >
                                <img src={chat.avatar} alt={chat.name} className="chat-avatar" />
                                <div className="chat-info">
                                    <div className="chat-name">{chat.name}</div>
                                    <div className="chat-neural">{chat.neuralNetwork}</div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <ProfileSection />
        </div>
    );
}