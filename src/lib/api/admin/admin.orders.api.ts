import axiosInstance from '@/lib/axios';
import { AdminOrderStatus, IAdminOrder, IAdminOrderStatsResponse, IAdminOrderStatusUpdateRequest } from './admin.orders.dto';

const Base = '/api/orders';

export const getAdminOrders = async (): Promise<IAdminOrder[]> => {
    const res = await axiosInstance.get(`${Base}/admin/all`);
    return res.data;
};

export const updateAdminOrderStatus = async (id: string, payload: IAdminOrderStatusUpdateRequest): Promise<IAdminOrder> => {
    const res = await axiosInstance.put(`${Base}/${id}/status`, payload);
    return res.data;
};

export const getAdminOrderStats = async (): Promise<IAdminOrderStatsResponse> => {
    const res = await axiosInstance.get(`${Base}/admin/stats`);
    return res.data;
};
