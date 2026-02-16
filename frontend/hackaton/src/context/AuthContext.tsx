
export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterCodeRequest {
    email: string;
    password: string;
    name: string;
}

export interface VerifyRegistrationRequest {
    registrationId: string;
    code: string;
}


export interface LoginResponse {
    success: boolean;
    message: string;
    redirectUrl?: string;
}

export interface RegistrationResponse {
    success: boolean;
    message: string;
    registrationId: string;
}

export interface SimpleResponse {
    success: boolean;
    message: string;
}
