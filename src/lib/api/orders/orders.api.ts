import axiosInstance from '@/lib/axios';
import { IOrderCreate, IOrder, IOrderListResponse } from './orders.dto';

const Base = '/api/orders';

export const createOrder = async (payload: IOrderCreate): Promise<any> => {
    const res = await axiosInstance.post(Base, payload);
    return res.data;
};

export const getOrders = async (params?: any): Promise<IOrderListResponse> => {
    const res = await axiosInstance.get(Base, { params });
    return res.data;
};

export const getOrder = async (id: string): Promise<IOrder> => {
    const res = await axiosInstance.get<IOrder>(`${Base}/${id}`);
    return res.data;
};

export const cancelOrder = async (id: string): Promise<void> => {
    const res = await axiosInstance.put(`${Base}/${id}/cancel`);
    return res.data;
};
