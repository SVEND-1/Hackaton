import React, { useState } from "react";
import {
    sendRegistrationCode,
    verifyRegistration
} from "../api/authApi";
import "./AuthForm.css";

const RegisterForm: React.FC = () => {
    const [step, setStep] = useState<"form" | "verify">("form");

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: ""
    });

    const [registrationId, setRegistrationId] = useState("");
    const [code, setCode] = useState("");
    const [message, setMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await sendRegistrationCode(formData);

            if (response.success) {
                setRegistrationId(response.registrationId);
                setStep("verify");
                setMessage("Код отправлен на email");
            } else {
                setMessage(response.message);
            }
        } catch {
            setMessage("Ошибка регистрации");
        }
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await verifyRegistration(
                registrationId,
                code
            );

            if (response.success) {
                alert("Регистрация завершена!");
            } else {
                setMessage(response.message);
            }
        } catch {
            setMessage("Ошибка подтверждения");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form-wrapper">
                <div className="auth-form">
                    <h2 className="auth-title">AI chats</h2>
                    <h3 className="auth-title3">register</h3>

                    {step === "form" && (
                        <form onSubmit={handleRegister}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                className="input-field"
                                onChange={handleChange}
                                required
                            />
                            <br /><br />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="input-field"
                                onChange={handleChange}
                                required
                            />
                            <br /><br />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="input-field"
                                onChange={handleChange}
                                required
                            />
                            <br /><br />
                            <button className="submit-button">
                                Зарегистрироваться
                            </button>
                        </form>
                    )}

                    {step === "verify" && (
                        <form onSubmit={handleVerify}>
                            <input
                                type="text"
                                placeholder="Verification code"
                                className="input-field"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                required
                            />
                            <br /><br />
                            <button className="submit-button">
                                Подтвердить
                            </button>
                        </form>
                    )}

                    {message && (
                        <p style={{ marginTop: 15, color: "white" }}>
                            {message}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
