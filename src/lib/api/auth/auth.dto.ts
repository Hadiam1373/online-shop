export interface ILoginParams {
    email: string;
    password: string;
}

type userRole = 'ADMIN' | 'USER' | 'OPERATOR';

export interface ILoginResponse {
    message: string;
    accessToken: string;
    refreshToken: string;
    user: {
        id: string;
        email: string;
        role: userRole;
    };
}

export interface IRegisterResponse {
    message: string;
    accessToken: string;
    refreshToken: string;
    user: {
        id: string;
        email: string;
        phone: string;
        address: string;
        role: userRole;
    };
}

export interface IRegisterParams {
    email: string;
    password: string;
    phone: string;
    address: string;
}

export interface IOtpBody {
    phone: string;
}

export interface IVerifyOtpBody {
    phone: string;
    code: string;
}

export interface IResponseOtpRequest {
    message: string;
    otp: string;
    phone: string;
}

export interface IResponseOtpVerify {
    message: string;
    accessToken: string;
    refreshToken: string;
    user: {
        id: string;
        phone: string;
        email: null;
        address: null;
        role: userRole;
    };
}

export interface ICompeleteUserSignUpBody {
    phone: string;
    email: string;
    password: string;
    address: string;
}