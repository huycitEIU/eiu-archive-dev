export interface RegisterRequestBody {
    username: string;
    email: string;
    password: string;
}

export interface LoginRequestBody {
    username: string;
    password: string;
}

export interface AuthTokenPayload {
    id: string;
    username: string;
}