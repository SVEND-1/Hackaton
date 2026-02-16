import axios from "axios";
import {
    LoginRequest,
    LoginResponse,
    RegisterCodeRequest,
    RegistrationResponse,
    VerifyRegistrationRequest,
    SimpleResponse
} from "../types/auth.types";

export const api = axios.create({
    baseURL: "http://localhost:8080/api",
    withCredentials: true
});


export const login = async (
    data: LoginRequest
): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>(
        "/auth/login",
        data
    );
    return response.data;
};

export const logout = async (): Promise<SimpleResponse> => {
    const response = await api.post<SimpleResponse>(
        "/auth/logout"
    );
    return response.data;
};

export const sendRegistrationCode = async (
    data: RegisterCodeRequest
): Promise<RegistrationResponse> => {
    const response = await api.post<RegistrationResponse>(
        "/auth/register/send-code",
        data
    );
    return response.data;
};

export const verifyRegistration = async (
    data: VerifyRegistrationRequest
): Promise<SimpleResponse> => {
    const response = await api.post<SimpleResponse>(
        "/auth/register/verify",
        data
    );
    return response.data;
};
