import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AuthForm.css";
import "../styles/auth.css";
import { forgotPassword } from "../api/authApi";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await forgotPassword(email);


            const resetId = response.data.resetId;

            navigate(`/reset-verify?resetId=${resetId}`);
        } catch (error) {
            alert("Ошибка отправки кода восстановления");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form-wrapper">
                <div className="auth-form">
                    <h2 className="auth-title">
                        AI Park <br />
                    </h2>
                    <h3 className="auth-title3">forgot password</h3>

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label className="input-label">email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input-field"
                                placeholder="your@email.com"
                                required
                            />
                        </div>

                        <button type="submit" className="submit-button">
                            Получить код
                        </button>

                        <p
                            onClick={() => navigate("/")}
                            className="auth-link"
                            style={{ cursor: "pointer" }}
                        >
                            Вернуться к входу
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
