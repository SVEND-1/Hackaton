import axios from "axios";

// Axios instance для auth
export const authAPI = axios.create({
    baseURL: "http://localhost:8080/api/auth",
    headers: { "Content-Type": "application/json" },
});

// JWT автоматически подставляется для защищённых эндпоинтов
authAPI.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// ===== TYPES =====

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    token: string;
    user?: {
        id: string;
        email: string;
        name: string;
        role: string;
    };
    message?: string;
}

export interface RegisterCodeRequest {
    email: string;
    password: string;
    name: string;
}

export interface VerifyRegisterRequest {
    registrationId: string;
    code: string;
}

export interface VerifyRegisterResponse {
    success: boolean;
    message?: string;
}

export interface ForgotPasswordResponse {
    success: boolean;
    resetId: string;
    message?: string;
}

export interface ResetPasswordRequest {
    resetId: string;
    newPassword: string;
    confirmPassword: string;
}

export interface ResetPasswordResponse {
    success: boolean;
    message?: string;
}

export interface VerifyResetCodeResponse {
    success: boolean;
    message?: string;
}

// ===== API FUNCTIONS =====

export const login = (data: LoginRequest) =>
    authAPI.post<LoginResponse>("/login", data);

export const logout = () => authAPI.post("/logout");

export const sendRegisterCode = (data: RegisterCodeRequest) =>
    authAPI.post("/register/send-code", data);

export const verifyRegister = (data: VerifyRegisterRequest) =>
    authAPI.post<VerifyRegisterResponse>("/register/verify", data);

export const resendCode = (registrationId: string) =>
    authAPI.post(`/register/resend-code?registrationId=${registrationId}`);

export const forgotPassword = (email: string) =>
    authAPI.post<ForgotPasswordResponse>(`/password/forgot?email=${encodeURIComponent(email)}`);

export const verifyResetCode = (resetId: string, code: string) =>
    authAPI.post<VerifyResetCodeResponse>(`/password/verify?resetId=${resetId}&code=${code}`);

export const resetPassword = (data: ResetPasswordRequest) =>
    authAPI.post<ResetPasswordResponse>("/password/reset", data);
