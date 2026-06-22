import axiosInstance from '@/lib/axios';
import {
    IStartZarinpalPaymentRequest,
    IStartZarinpalPaymentResponse,
    IVerifyZarinpalPaymentRequest,
    IVerifyZarinpalPaymentResponse,
} from './zarinpal.dto';

const Base = '/api/payments/zarinpal';

export const startZarinpalPayment = async (payload: IStartZarinpalPaymentRequest): Promise<IStartZarinpalPaymentResponse> => {
    const res = await axiosInstance.post(`${Base}/request`, payload);
    return res.data;
};

export const verifyZarinpalPayment = async (payload: IVerifyZarinpalPaymentRequest): Promise<IVerifyZarinpalPaymentResponse> => {
    const res = await axiosInstance.post(`${Base}/verify`, payload);
    return res.data;
};
