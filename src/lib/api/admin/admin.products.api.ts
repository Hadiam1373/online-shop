import axiosInstance from '@/lib/axios';
import { IAdminProductInput, IAdminProductResponse, IAdminProductsFilters, IAdminProductsResponse } from './admin.products.dto';

const Base = '/api/products';

export const getAdminProducts = async (
    page: number,
    limit: number,
    filters?: IAdminProductsFilters,
): Promise<IAdminProductsResponse> => {
    const res = await axiosInstance.get(Base, { params: { page, limit, ...filters } });
    return res.data;
};

export const getAdminProduct = async (id: string): Promise<IAdminProductResponse> => {
    const res = await axiosInstance.get(`${Base}/${id}`);
    return res.data;
};

export const createAdminProduct = async (payload: IAdminProductInput): Promise<IAdminProductResponse> => {
    const res = await axiosInstance.post(Base, payload);
    return res.data;
};

export const updateAdminProduct = async (id: string, payload: IAdminProductInput): Promise<IAdminProductResponse> => {
    const res = await axiosInstance.put(`${Base}/${id}`, payload);
    return res.data;
};

export const deleteAdminProduct = async (id: string): Promise<void> => {
    const res = await axiosInstance.delete(`${Base}/${id}`);
    return res.data;
};
