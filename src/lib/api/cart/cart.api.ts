import axiosInstance from '@/lib/axios';
import { ICartItemInput, ICartResponse, ICartCalculateResponse } from './cart.dto';

const Base = '/api/cart';

export const getCart = async (): Promise<ICartResponse> => {
    const res = await axiosInstance.get(Base);
    return res.data;
};

export const addToCart = async (payload: ICartItemInput): Promise<any> => {
    const res = await axiosInstance.post(Base, payload);
    return res.data;
};

export const clearCart = async (): Promise<any> => {
    const res = await axiosInstance.delete(Base);
    return res.data;
};

export const calculateCartTotal = async (payload: any): Promise<ICartCalculateResponse> => {
    const res = await axiosInstance.post(`${Base}/calculate-total`, payload);
    return res.data;
};

export const updateCartItem = async (cartItemId: string, payload: { type: string }): Promise<any> => {
    const res = await axiosInstance.post(`${Base}/${cartItemId}/${payload.type}`);
    return res.data;
};

export const removeCartItem = async (cartItemId: string): Promise<any> => {
    const res = await axiosInstance.delete(`${Base}/${cartItemId}`);
    return res.data;
};
