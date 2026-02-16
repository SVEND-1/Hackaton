export interface LoginRequest {
    email: string;
    password: string;
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

export interface ResetPasswordRequest {
    resetId: string;
    newPassword: string;
    confirmPassword: string;
}

export interface LoginResponse {
    success: boolean;
    message: string;
    redirectUrl: string;
}

export interface RegistrationResponse {
    success: boolean;
    message: string;
    registrationId: string;
}

export interface PasswordResetResponse {
    success: boolean;
    message: string;
    resetId: string;
}

export interface SimpleResponse {
    success: boolean;
    message: string;
}

export type AuthStep = 'login' | 'register' | 'verify' | 'forgot' | 'reset';