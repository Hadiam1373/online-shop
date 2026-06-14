import axiosInstance from '@/lib/axios';
import { IAdminCategoryInput, IAdminCategoryResponse, IAdminCategoryUpdateInput } from './admin.categories.dto';

const Base = '/api/categories';

export const getAdminCategories = async (): Promise<IAdminCategoryResponse[]> => {
    const res = await axiosInstance.get(Base);
    return res.data;
};

export const getAdminCategory = async (id: string): Promise<IAdminCategoryResponse> => {
    const res = await axiosInstance.get(`${Base}/${id}`);
    return res.data;
};

export const createAdminCategory = async (payload: IAdminCategoryInput): Promise<IAdminCategoryResponse> => {
    const res = await axiosInstance.post(Base, payload);
    return res.data;
};

export const updateAdminCategory = async (id: string, payload: IAdminCategoryUpdateInput): Promise<IAdminCategoryResponse> => {
    const res = await axiosInstance.put(`${Base}/${id}`, payload);
    return res.data;
};

export const deleteAdminCategory = async (id: string): Promise<void> => {
    const res = await axiosInstance.delete(`${Base}/${id}`);
    return res.data;
};
