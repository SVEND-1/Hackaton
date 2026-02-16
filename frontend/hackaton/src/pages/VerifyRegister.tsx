import { useState } from "react";
import { verifyRegister } from "../api/authApi";
import { useSearchParams, useNavigate } from "react-router-dom";
import "../styles/auth.css";

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
            <form className="auth-card" onSubmit={handleSubmit}>
                <h2>Подтверждение</h2>

                <input
                    type="text"
                    placeholder="Введите код"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                />

                <button type="submit">Подтвердить</button>
            </form>
        </div>
    );
}
