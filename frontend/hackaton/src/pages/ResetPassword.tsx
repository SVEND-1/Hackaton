import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../api/authApi";
import AuthContainer from "../components/auth/AuthContainer";
import AuthTitle from "../components/auth/AuthTitle";
import AuthSubtitle from "../components/auth/AuthSubtitle";
import ResetPasswordForm from "../components/auth/ResetPasswordForm";
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
        <AuthContainer>
            <div className="auth-form-wrapper">
                <div className="auth-form">
                    <AuthTitle>AI chats</AuthTitle>
                    <AuthSubtitle>reset password</AuthSubtitle>
                    <ResetPasswordForm
                        newPassword={newPassword}
                        setNewPassword={setNewPassword}
                        confirmPassword={confirmPassword}
                        setConfirmPassword={setConfirmPassword}
                        handleSubmit={handleSubmit}
                        navigate={navigate}
                    />
                </div>
            </div>
        </AuthContainer>
    );
}