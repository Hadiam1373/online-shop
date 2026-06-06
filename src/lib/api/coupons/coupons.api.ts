import axiosInstance from "@/lib/axios";
import { ICoupon, ICouponInput } from "./coupons.dto";

const Base = "/api/coupons";

export const validateCoupon = async (code: string): Promise<ICoupon> => {
  const res = await axiosInstance.post(`${Base}/validate`, { code });
  return res.data;
};

export const createCoupon = async (payload: ICouponInput): Promise<ICoupon> => {
  const res = await axiosInstance.post(Base, payload);
  return res.data;
};
