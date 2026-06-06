import axiosInstance from '@/lib/axios';
import { IUpdateUserProfile, IUserProfileResponse } from './users.dto';

const BaseUrl = '/users/profile';

export const getUserProfile = async () => {
    const response = await axiosInstance.get<IUserProfileResponse>(BaseUrl);
    return response.data;
};

export const updateUserProfile = async (params: IUpdateUserProfile) => {
    const response = await axiosInstance.put<IUserProfileResponse>(BaseUrl, params);
    return response.data;
};
