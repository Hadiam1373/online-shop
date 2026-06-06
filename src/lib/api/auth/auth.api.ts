import axiosInstance from "@/lib/axios";
import {
  IAuthLoginParams,
  IAuthLoginResponse,
  IRegisterParams,
  IOtpRequest,
  IOtpVerify,
  ICompleteRegistration,
  IRefreshParams,
  IPasswordResetRequest,
  IPasswordResetConfirm,
} from "./auth.dto";

const Base = "/api/auth";

export const register = async (params: IRegisterParams): Promise<IAuthLoginResponse> => {
  const res = await axiosInstance.post(`${Base}/register`, params);
  return res.data;
};

export const login = async (
  params: IAuthLoginParams,
): Promise<IAuthLoginResponse> => {
  const res = await axiosInstance.post(`${Base}/login`, params);
  return res.data;
};

export const refreshToken = async (params: IRefreshParams): Promise<IAuthLoginResponse> => {
  const res = await axiosInstance.post(`${Base}/refresh`, params);
  return res.data;
};

export const requestOtp = async (params: IOtpRequest): Promise<any> => {
  const res = await axiosInstance.post(`${Base}/request-otp`, params);
  return res.data;
};

export const verifyOtp = async (params: IOtpVerify): Promise<any> => {
  const res = await axiosInstance.post(`${Base}/verify-otp`, params);
  return res.data;
};

export const completeRegistration = async (params: ICompleteRegistration): Promise<IAuthLoginResponse> => {
  const res = await axiosInstance.post(`${Base}/complete-registration`, params);
  return res.data;
};

export const requestPasswordReset = async (params: IPasswordResetRequest): Promise<any> => {
  const res = await axiosInstance.post(
    `${Base}/request-password-reset`,
    params,
  );
  return res.data;
};

export const resetPassword = async (params: IPasswordResetConfirm): Promise<IAuthLoginResponse> => {
  const res = await axiosInstance.post(`${Base}/reset-password`, params);
  return res.data;
};
