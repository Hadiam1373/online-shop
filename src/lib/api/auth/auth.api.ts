import axiosInstance from "@/lib/axios";
import {ILoginParams, ILoginResponse, IOtpBody, IRegisterParams, IRegisterResponse, IVerifyOtpBody} from "./auth.dto";

const BaseUrl = "/auth";

export const login = async (params: ILoginParams) => {
  const response = await axiosInstance.post<ILoginResponse>(BaseUrl + "/login", params);
  return response.data;
};

export const register = async (params: IRegisterParams) => {
  const response = await axiosInstance.post<IRegisterResponse>(BaseUrl + "/register", params);
  return response.data;
};

export const requestOTP = async (params: IOtpBody) => {
  const response = await axiosInstance.post<ILoginResponse>(BaseUrl + "/request-otp" , {data: params});
  return response.data;
}

export const verifyOTP = async (params: IVerifyOtpBody) => {
  const response = await axiosInstance.post<ILoginResponse>(BaseUrl + "/verify-otp" , {data: params});
  return response.data;
}