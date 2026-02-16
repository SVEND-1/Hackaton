import { useState } from "react";
import { login } from "../api/authApi";
import "../styles/AuthForm.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login({ email, password });
            navigate("/dashboard");
        } catch (error) {
            alert("Ошибка входа");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form-wrapper">
                <div className="auth-form">
                    <h2 className="auth-title">
                        AI chats <br />
                    </h2>
                    <h3 className="auth-title3">login</h3>

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label className="input-label">email</label>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input-field"
                                placeholder="your@email.com"
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label className="input-label">password</label>
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input-field"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <div className="forgot-password">
                            <button
                                type="button"
                                onClick={() => alert("Forgot password")}
                                className="forgot-button"
                            >
                                забыли пароль?
                            </button>
                        </div>

                        <button type="submit" className="submit-button">
                            Войти
                        </button>

                        <p
                            onClick={() => navigate("/register")}
                            className="auth-link"
                            style={{ cursor: "pointer" }}
                        >
                            Нет аккаунта? Зарегистрироваться
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
