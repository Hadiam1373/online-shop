import axiosInstance from '@/lib/axios';
import {
    AdminOrderStatus,
    IAdminOrder,
    IAdminOrderListResponse,
    IAdminOrderStatsResponse,
    IAdminOrderStatusUpdateRequest,
} from './admin.orders.dto';

const Base = '/api/orders';

export const getAdminOrders = async (): Promise<IAdminOrderListResponse> => {
    const res = await axiosInstance.get<IAdminOrderListResponse>(`${Base}/admin/all`);
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
