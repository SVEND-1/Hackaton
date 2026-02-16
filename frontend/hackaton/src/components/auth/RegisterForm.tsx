import Field from "./Field.tsx";
import Button from "./Button.tsx";
import type {RegisterFormProps} from "../../types/auth.types";

export default function RegisterForm({ form, setForm, handleSubmit, navigate }: RegisterFormProps) {
    const isFormValid = form.email.trim() && form.password.trim() && form.name.trim();

    return (
        <form onSubmit={handleSubmit}>
            <Field
                className="input-group"
                label="name"
                id="register-name"
                type="text"
                value={form.name}
                onInput={(e: any) => setForm({ ...form, name: e.target.value })}
                placeholder="your name"
                required
            />

            <Field
                className="input-group"
                label="email"
                id="register-email"
                type="email"
                value={form.email}
                onInput={(e: any) => setForm({ ...form, email: e.target.value })}
                placeholder="your@email.com"
                required
            />

            <Field
                className="input-group"
                label="password"
                id="register-password"
                type="password"
                value={form.password}
                onInput={(e: any) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
                required
            />

            <Button
                type="submit"
                className="submit-button"
                isDisabled={!isFormValid}
            >
                Получить код
            </Button>

            <p
                onClick={() => navigate("/")}
                className="auth-link"
                style={{ cursor: "pointer" }}
            >
                Уже есть аккаунт? Войти
            </p>
        </form>
    );
}