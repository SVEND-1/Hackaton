import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendRegisterCode } from "../api/authApi";
import AuthContainer from "../components/auth/AuthContainer.tsx";
import AuthTitle from "../components/auth/AuthTitle.tsx";
import AuthSubtitle from "../components/auth/AuthSubtitle.tsx";
import RegisterForm from "../components/auth/RegisterForm.tsx";

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
        <AuthContainer>
            <div className="auth-form-wrapper">
                <div className="auth-form">
                    <AuthTitle>AI chats</AuthTitle>
                    <AuthSubtitle>register</AuthSubtitle>
                    <RegisterForm
                        form={form}
                        setForm={setForm}
                        handleSubmit={handleSubmit}
                        navigate={navigate}
                    />
                </div>
            </div>
        </AuthContainer>
    );
}