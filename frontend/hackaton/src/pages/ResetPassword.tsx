import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../api/authApi";
import "../styles/AuthForm.css";
import "../styles/auth.css";

export default function ResetPassword() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const resetId = searchParams.get("resetId");

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!resetId) {
            alert("Некорректная ссылка восстановления");
            return;
        }

        try {
            const response = await resetPassword({
                resetId,
                newPassword,
                confirmPassword,
            });

            if (response.data.success) {
                navigate("/dashboard");
            } else {
                alert(response.data.message);
            }

        } catch (error) {
            alert("Ошибка при сбросе пароля");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form-wrapper">
                <div className="auth-form">
                    <h2 className="auth-title">
                        AI chats <br />
                    </h2>
                    <h3 className="auth-title3">reset password</h3>

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label className="input-label">new password</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="input-field"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label className="input-label">confirm password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="input-field"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button type="submit" className="submit-button">
                            Сменить пароль
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
