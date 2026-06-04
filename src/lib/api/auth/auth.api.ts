import axiosInstance from '@/lib/axios';
import {
    ICompleteUserSignUpBody,
    ILoginParams,
    ILoginResponse,
    IOtpBody,
    IRegisterParams,
    IRegisterResponse,
    IResponseOtpRequest,
    IResponseOtpVerify,
    IVerifyOtpBody,
} from './auth.dto';

const BaseUrl = '/auth';

export const login = async (params: ILoginParams) => {
    const response = await axiosInstance.post<ILoginResponse>(BaseUrl + '/login', params);
    return response.data;
};

export const register = async (params: IRegisterParams) => {
    const response = await axiosInstance.post<IRegisterResponse>(BaseUrl + '/register', params);
    return response.data;
};

export const requestOTP = async (params: IOtpBody) => {
    const response = await axiosInstance.post<IResponseOtpRequest>(BaseUrl + '/request-otp', { phone: params.phone });
    return response.data;
};

export const verifyOTP = async (params: IVerifyOtpBody) => {
    const response = await axiosInstance.post<IResponseOtpVerify>(BaseUrl + '/verify-otp', { code: params.code, phone: params.phone });
    return response.data;
};

export const completeUserRegister = async (params: ICompleteUserSignUpBody) => {
    const response = await axiosInstance.post<IResponseOtpVerify>(BaseUrl + '/complete-registration', params);
    return response.data;
};
