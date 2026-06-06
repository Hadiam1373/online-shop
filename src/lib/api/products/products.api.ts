import axiosInstance from "@/lib/axios";
import { IProduct, IProductInput } from "./products.dto";

const Base = "/api/products";

export const getProducts = async () => {
  const res = await axiosInstance.get<IProduct[]>(Base);
  return res.data;
};

export const getProduct = async (id: string) => {
  const res = await axiosInstance.get<IProduct>(`${Base}/${id}`);
  return res.data;
};

export const createProduct = async (payload: IProductInput) => {
  const res = await axiosInstance.post<IProduct>(Base, payload);
  return res.data;
};

export const updateProduct = async (
  id: string,
  payload: Partial<IProductInput>,
) => {
  const res = await axiosInstance.put<IProduct>(`${Base}/${id}`, payload);
  return res.data;
};

export const deleteProduct = async (id: string) => {
  const res = await axiosInstance.delete(`${Base}/${id}`);
  return res.data;
};
