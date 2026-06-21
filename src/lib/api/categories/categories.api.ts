import axiosInstance from '@/lib/axios';
import { ICategoryInput, ICategory, ICategoryResponse } from './categories.dto';

const Base = '/api/categories';

export const getCategories = async (): Promise<ICategoryResponse> => {
    const res = await axiosInstance.get<ICategoryResponse>(Base);
    return res.data;
};

export const getCategory = async (id: string): Promise<ICategory> => {
    const res = await axiosInstance.get<ICategory>(`${Base}/${id}`);
    return res.data;
};

export const createCategory = async (payload: ICategoryInput): Promise<ICategory> => {
    const res = await axiosInstance.post<ICategory>(Base, payload);
    return res.data;
};

export const updateCategory = async (id: string, payload: Partial<ICategoryInput>): Promise<ICategory> => {
    const res = await axiosInstance.put<ICategory>(`${Base}/${id}`, payload);
    return res.data;
};

export const deleteCategory = async (id: string): Promise<any> => {
    const res = await axiosInstance.delete(`${Base}/${id}`);
    return res.data;
};
