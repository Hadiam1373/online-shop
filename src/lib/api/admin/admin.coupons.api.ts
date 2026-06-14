import axiosInstance from '@/lib/axios';
import { IAdminCouponInput, IAdminCouponStatsResponse, IAdminCouponUpdateInput } from './admin.coupons.dto';

const Base = '/api/coupons';

export const getAdminCoupons = async (): Promise<IAdminCoupon[]> => {
    const res = await axiosInstance.get(`${Base}`);
    return res.data;
};

export const getAdminCouponStats = async (): Promise<IAdminCouponStatsResponse> => {
    const res = await axiosInstance.get(`${Base}/admin/stats`);
    return res.data;
};

export const createAdminCoupon = async (payload: IAdminCouponInput): Promise<IAdminCoupon> => {
    const res = await axiosInstance.post(Base, payload);
    return res.data;
};

export const updateAdminCoupon = async (id: string, payload: IAdminCouponUpdateInput): Promise<IAdminCoupon> => {
    const res = await axiosInstance.put(`${Base}/${id}`, payload);
    return res.data;
};

export const deleteAdminCoupon = async (id: string): Promise<void> => {
    const res = await axiosInstance.delete(`${Base}/${id}`);
    return res.data;
};
