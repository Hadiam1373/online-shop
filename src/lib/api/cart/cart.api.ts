import axiosInstance from "@/lib/axios";
import { ICartItemInput } from "./cart.dto";

const Base = "/api/cart";

export const getCart = async () => {
  const res = await axiosInstance.get(Base);
  return res.data;
};

export const addToCart = async (payload: ICartItemInput) => {
  const res = await axiosInstance.post(Base, payload);
  return res.data;
};

export const clearCart = async () => {
  const res = await axiosInstance.delete(Base);
  return res.data;
};

export const calculateCartTotal = async (payload: any) => {
  const res = await axiosInstance.post(`${Base}/calculate-total`, payload);
  return res.data;
};

export const updateCartItem = async (
  cartItemId: string,
  payload: { quantity: number },
) => {
  const res = await axiosInstance.put(`${Base}/${cartItemId}`, payload);
  return res.data;
};

export const removeCartItem = async (cartItemId: string) => {
  const res = await axiosInstance.delete(`${Base}/${cartItemId}`);
  return res.data;
};
