import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyResetCode } from "../api/authApi";
import AuthContainer from "../components/auth/AuthContainer.tsx";
import AuthTitle from "../components/auth/AuthTitle.tsx";
import AuthSubtitle from "../components/auth/AuthSubtitle.tsx";
import VerifyResetCodeForm from "../components/auth/VerifyResetCodeForm.tsx";

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
        <AuthContainer>
            <div className="auth-form-wrapper">
                <div className="auth-form">
                    <AuthTitle>AI chats</AuthTitle>
                    <AuthSubtitle>verify reset code</AuthSubtitle>
                    <VerifyResetCodeForm
                        code={code}
                        setCode={setCode}
                        handleSubmit={handleSubmit}
                        navigate={navigate}
                    />
                </div>
            </div>
        </AuthContainer>
    );
}