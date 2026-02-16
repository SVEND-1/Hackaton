import { useState } from "react";
import { sendRegisterCode } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import "../styles/AuthForm.css";
import "../styles/auth.css";

export default function Register() {
    const [form, setForm] = useState({
        email: "",
        password: "",
        name: "",
    });

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await sendRegisterCode(form);
            const registrationId = response.data.registrationId;
            navigate(`/verify?registrationId=${registrationId}`);
        } catch (err) {
            alert("Ошибка регистрации");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form-wrapper">
                <div className="auth-form">
                    <h2 className="auth-title">
                        AI chats <br />
                    </h2>
                    <h3 className="auth-title3">register</h3>

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label className="input-label">name</label>
                            <input
                                type="text"
                                value={form.name}
                                onChange={(e) =>
                                    setForm({ ...form, name: e.target.value })
                                }
                                className="input-field"
                                placeholder="your name"
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label className="input-label">email</label>
                            <input
                                type="email"
                                value={form.email}
                                onChange={(e) =>
                                    setForm({ ...form, email: e.target.value })
                                }
                                className="input-field"
                                placeholder="your@email.com"
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label className="input-label">password</label>
                            <input
                                type="password"
                                value={form.password}
                                onChange={(e) =>
                                    setForm({ ...form, password: e.target.value })
                                }
                                className="input-field"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button type="submit" className="submit-button">
                            Получить код
                        </button>

                        <p
                            onClick={() => navigate("/login")}
                            className="auth-link"
                            style={{ cursor: "pointer" }}
                        >
                            Уже есть аккаунт? Войти
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
