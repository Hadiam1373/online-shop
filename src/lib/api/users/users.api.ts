import axiosInstance from '@/lib/axios';
import { IChangePasswordParams, IUpdateUserProfile, IUserProfileResponse } from './users.dto';

const BaseUrl = '/api/users/profile';

export const getUserProfile = async (): Promise<IUserProfileResponse> => {
    const response = await axiosInstance.get<IUserProfileResponse>(BaseUrl);
    return response.data;
};

export const updateUserProfile = async (params: IUpdateUserProfile): Promise<IUserProfileResponse> => {
    const response = await axiosInstance.put<IUserProfileResponse>(BaseUrl, params);
    return response.data;
};

export const changePassword = async (params: IChangePasswordParams): Promise<void> => {
    const response = await axiosInstance.post('/api/users/change-password', params);
    return response.data;
};
