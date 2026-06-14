import axiosInstance from '@/lib/axios';
import { IAdminPayment, IAdminPaymentStatsResponse, IAdminPaymentRefundResponse } from './admin.payments.dto';

const Base = '/api/payments';

export const getAdminPayments = async (): Promise<IAdminPayment[]> => {
    const res = await axiosInstance.get(`${Base}/admin/all`);
    return res.data;
};

export const getAdminPaymentStats = async (): Promise<IAdminPaymentStatsResponse> => {
    const res = await axiosInstance.get(`${Base}/admin/stats`);
    return res.data;
};

export const refundAdminPayment = async (paymentId: string): Promise<IAdminPaymentRefundResponse> => {
    const res = await axiosInstance.post(`${Base}/${paymentId}/refund`);
    return res.data;
};
