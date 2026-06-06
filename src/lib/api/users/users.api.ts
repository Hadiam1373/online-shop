import axiosInstance from "@/lib/axios";
import { IUpdateUserProfile, IUserProfileResponse } from "./users.dto";

const BaseUrl = "/api/users/profile";

export const getUserProfile = async (): Promise<IUserProfileResponse> => {
  const response = await axiosInstance.get<IUserProfileResponse>(BaseUrl);
  return response.data;
};

export const updateUserProfile = async (params: IUpdateUserProfile): Promise<IUserProfileResponse> => {
  const response = await axiosInstance.put<IUserProfileResponse>(
    BaseUrl,
    params,
  );
  return response.data;
};
