import axiosInstance from "@/lib/axios";
import { ICategoryInput, ICategory } from "./categories.dto";

const Base = "/api/categories";

export const getCategories = async () => {
  const res = await axiosInstance.get<ICategory[]>(Base);
  return res.data;
};

export const getCategory = async (id: string) => {
  const res = await axiosInstance.get<ICategory>(`${Base}/${id}`);
  return res.data;
};

export const createCategory = async (payload: ICategoryInput) => {
  const res = await axiosInstance.post<ICategory>(Base, payload);
  return res.data;
};

export const updateCategory = async (
  id: string,
  payload: Partial<ICategoryInput>,
) => {
  const res = await axiosInstance.put<ICategory>(`${Base}/${id}`, payload);
  return res.data;
};

export const deleteCategory = async (id: string) => {
  const res = await axiosInstance.delete(`${Base}/${id}`);
  return res.data;
};
