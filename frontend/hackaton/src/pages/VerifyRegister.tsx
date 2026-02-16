import { useState } from "react";
import { verifyRegister } from "../api/authApi";
import { useSearchParams, useNavigate } from "react-router-dom";
import "../styles/AuthForm.css";

export default function VerifyRegister() {
    const [code, setCode] = useState("");
    const [params] = useSearchParams();
    const navigate = useNavigate();

    const registrationId = params.get("registrationId") || "";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await verifyRegister({ registrationId, code });
            navigate("/dashboard");
        } catch {
            alert("Неверный код");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form-wrapper">
                <div className="auth-form">
                    <h2 className="auth-title">
                        AI chats <br />
                    </h2>
                    <h3 className="auth-title3">verification</h3>

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label className="input-label">code</label>
                            <input
                                type="text"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="input-field"
                                placeholder="enter verification code"
                                required
                            />
                        </div>

                        <button type="submit" className="submit-button">
                            Подтвердить
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
