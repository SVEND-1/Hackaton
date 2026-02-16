import React, { useState } from "react";
import "./AuthForm.css";
import { login } from "../api/authApi";

const AuthForm: React.FC = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await login(formData);

            if (response.success) {
                if (response.redirectUrl) {
                    window.location.href = response.redirectUrl;
                } else {
                    alert("Login successful!");
                }
            } else {
                setError(response.message);
            }
        } catch (err: any) {
            setError(
                err.response?.data?.message || "Ошибка сервера"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form-wrapper">
                <div className="auth-form">
                    <h2 className="auth-title">AI chats</h2>
                    <h3 className="auth-title3">login</h3>

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label className="input-label">
                                email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="input-field"
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label className="input-label">
                                password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="input-field"
                                required
                            />
                        </div>

                        {error && (
                            <p style={{ color: "red", marginBottom: 10 }}>
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="submit-button"
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Войти"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;
