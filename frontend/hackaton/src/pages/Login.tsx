import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authApi";
import AuthContainer from "../components/auth/AuthContainer.tsx";
import AuthTitle from "../components/auth/AuthTitle.tsx";
import AuthSubtitle from "../components/auth/AuthSubtitle.tsx";
import LoginForm from "../components/auth/LoginForm.tsx";

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
        <AuthContainer>
            <div className="auth-form-wrapper">
                <div className="auth-form">
                    <AuthTitle>AI chats</AuthTitle>
                    <AuthSubtitle>login</AuthSubtitle>
                    <LoginForm
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        handleSubmit={handleSubmit}
                        navigate={navigate}
                    />
                </div>
            </div>
        </AuthContainer>
    );
}