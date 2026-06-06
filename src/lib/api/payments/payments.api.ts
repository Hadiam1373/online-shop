import axiosInstance from "@/lib/axios";
import { IPaymentProcess } from "./payments.dto";

const Base = "/api/payments";

export const processPayment = async (payload: IPaymentProcess) => {
  const res = await axiosInstance.post(`${Base}/process`, payload);
  return res.data;
};
