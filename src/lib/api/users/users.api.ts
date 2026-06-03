import axiosInstance from '@/lib/axios';
import { ApiResponse } from '../shared.dto';
import { IUserProfileResponse } from './users.dto';

const BaseUrl = '/users';

export const getUserProfile = async () => {
    const response = await axiosInstance.get<ApiResponse<IUserProfileResponse>>(BaseUrl);
    return response.data;
};

