import axiosInstance from "@/lib/axios";
import { IProduct, IProductInput } from "./products.dto";

const Base = "/api/products";

export const getProducts = async (): Promise<IProduct[]> => {
  const res = await axiosInstance.get<IProduct[]>(Base);
  return res.data;
};

export const getProduct = async (id: string): Promise<IProduct> => {
  const res = await axiosInstance.get<IProduct>(`${Base}/${id}`);
  return res.data;
};

export const createProduct = async (payload: IProductInput): Promise<IProduct> => {
  const res = await axiosInstance.post<IProduct>(Base, payload);
  return res.data;
};

export const updateProduct = async (
  id: string,
  payload: Partial<IProductInput>,
): Promise<IProduct> => {
  const res = await axiosInstance.put<IProduct>(`${Base}/${id}`, payload);
  return res.data;
};

export const deleteProduct = async (id: string): Promise<any> => {
  const res = await axiosInstance.delete(`${Base}/${id}`);
  return res.data;
};
