import { useState } from "react";
import { sendRegisterCode } from "../api/authApi";
import { useNavigate } from "react-router-dom";
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
            <form className="auth-card" onSubmit={handleSubmit}>
                <h2>Регистрация</h2>

                <input
                    type="text"
                    placeholder="Имя"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                />

                <input
                    type="password"
                    placeholder="Пароль"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                />

                <button type="submit">Получить код</button>
            </form>
        </div>
    );
}
