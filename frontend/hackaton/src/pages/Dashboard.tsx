import { Link } from "react-router-dom";


import "../styles/dashboard.css";

export default function Dashboard() {




    return (
        <div className="app">
            {/* Sidebar */}
            <div className="sidebar">
                <div className="logo">
                    AI Park
                </div>

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

                    <Link to="/dashboard" className="nav-btn active">
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
                    <Link to="/profile" className="profile-btn active">
                        <div className="profile-avatar">
                            <svg viewBox="0 0 24 24" strokeWidth="1.5">
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0
                     3.75 3.75 0 0 1 7.5 0ZM4.501 20.118
                     a7.5 7.5 0 0 1 14.998 0A17.933
                     17.933 0 0 1 12 21.75c-2.676
                     0-5.216-.584-7.499-1.632Z"
                                />
                            </svg>
                        </div>
                        <span>профиль</span>
                    </Link>
                </div>
            </div>

            {/* Main content */}
            <div className="main-content">
                <div className="dashboard-page">
                    <div className="dashboard-header">
                        <h1>дашборд</h1>
                        <p>статистика и мониторинг нейросетей</p>
                    </div>

                    {/* Stats */}
                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-title">всего сообщений</div>
                            <div className="stat-value">1,247</div>
                            <div className="stat-desc">+12% за сегодня</div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-title">количество агентов</div>
                            <div className="stat-value">5</div>
                            <div className="stat-desc">из 8 зарегистрированных</div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-title">среднее время ответа</div>
                            <div className="stat-value">1.2с</div>
                            <div className="stat-desc">на 0.3с быстрее</div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-title">пользователей онлайн</div>
                            <div className="stat-value">3</div>
                            <div className="stat-desc">пик: 12 человек</div>
                        </div>
                    </div>

                    {/* Events */}
                    <div className="events-feed">
                        <div className="events-header">
                            <h3>Лента событий</h3>
                            <span className="events-count">0 новых</span>
                        </div>
                        <div className="events-empty">
                            <p>Событий пока нет</p>
                            <span>Когда появятся новые действия — они отобразятся здесь</span>
                        </div>
                    </div>

                    {/* Agents */}
                    <div className="agents-section">
                        <div className="agents-header">
                            <h3>Нейросети</h3>
                            <div className="agents-header-stats">
                                <span>Сообщения</span>
                                <span>Настроение</span>
                            </div>
                        </div>

                        <div className="agents-list">
                            {[
                                { name: "Yandex-GPT", avatar: "YG", messages: 247, mood: "хорошее", moodClass: "mood-good" },
                                { name: "GIGA-chat", avatar: "GC", messages: 198, mood: "нормальное", moodClass: "mood-neutral" },
                                { name: "Chat-gpt", avatar: "CG", messages: 312, mood: "отличное", moodClass: "mood-excellent" },
                                { name: "DeepSeek", avatar: "DS", messages: 156, mood: "плохое", moodClass: "mood-bad" },
                                { name: "Нейросеть-5", avatar: "N5", messages: 89, mood: "ужасное", moodClass: "mood-terrible" }
                            ].map((agent, index) => (
                                <div key={index} className="agent-item">
                                    <div className="agent-info">
                                        <div className="agent-avatar">{agent.avatar}</div>
                                        <span className="agent-name">{agent.name}</span>
                                    </div>
                                    <div className="agent-stats">
                                        <span className="agent-messages">{agent.messages}</span>
                                        <span className={`agent-mood ${agent.moodClass}`}>
                                            {agent.mood}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
