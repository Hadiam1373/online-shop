import axiosInstance from "@/lib/axios";
import { ILoginParams, ILoginResponse, IRegisterParams } from "./auth.dto";

const BaseUrl = "/auth";

export const login = async (params: ILoginParams) => {
  const response = await axiosInstance.post<ILoginResponse>(BaseUrl + "/login", params);
  return response.data;
};

export const register = async (params: IRegisterParams) => {
  const response = await axiosInstance.post(BaseUrl + "/register", params);
  return response.data;
};
