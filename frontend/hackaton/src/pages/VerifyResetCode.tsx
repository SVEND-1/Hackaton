import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyResetCode } from "../api/authApi";
import "../styles/AuthForm.css";
import "../styles/auth.css";

export default function VerifyResetCode() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const resetId = searchParams.get("resetId");

    const [code, setCode] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!resetId) {
            alert("Некорректная ссылка восстановления");
            return;
        }

        try {
            const response = await verifyResetCode(resetId, code);

            if (response.data.success) {
                navigate(`/reset-password?resetId=${resetId}`);
            } else {
                alert(response.data.message);
            }

        } catch (error) {
            alert("Ошибка проверки кода");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form-wrapper">
                <div className="auth-form">
                    <h2 className="auth-title">
                        AI chats <br />
                    </h2>
                    <h3 className="auth-title3">verify reset code</h3>

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label className="input-label">verification code</label>
                            <input
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="input-field"
                                placeholder="Введите код из email"
                                required
                            />
                        </div>

                        <button type="submit" className="submit-button">
                            Подтвердить код
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
