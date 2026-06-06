import axiosInstance from "@/lib/axios";

const Base = "/api/coupons";

export const validateCoupon = async (code: string) => {
  const res = await axiosInstance.post(`${Base}/validate`, { code });
  return res.data;
};

export const createCoupon = async (payload: any) => {
  const res = await axiosInstance.post(Base, payload);
  return res.data;
};
