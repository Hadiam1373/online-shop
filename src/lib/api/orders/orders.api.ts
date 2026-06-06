import axiosInstance from "@/lib/axios";
import { IOrderCreate, IOrder } from "./orders.dto";

const Base = "/api/orders";

export const createOrder = async (payload: IOrderCreate) => {
  const res = await axiosInstance.post(Base, payload);
  return res.data;
};

export const getOrders = async (params?: any) => {
  const res = await axiosInstance.get(Base, { params });
  return res.data;
};

export const getOrder = async (id: string) => {
  const res = await axiosInstance.get<IOrder>(`${Base}/${id}`);
  return res.data;
};
