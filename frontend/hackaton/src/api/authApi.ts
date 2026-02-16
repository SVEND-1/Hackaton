import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080/api/auth",
    withCredentials: true,
});

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

export const login = (data: LoginRequest) =>
    API.post("/login", data);

export const logout = () =>
    API.post("/logout");

export const sendRegisterCode = (data: RegisterCodeRequest) =>
    API.post("/register/send-code", data);

export const verifyRegister = (data: VerifyRegisterRequest) =>
    API.post("/register/verify", data);

export const resendCode = (registrationId: string) =>
    API.post(`/register/resend-code?registrationId=${registrationId}`);
