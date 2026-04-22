import axiosInstance from "@/lib/axios";
import { ApiPostResponse, ApiResponse } from "../shared.dto";
import { ICreateProductProps, IProductsResponse } from "./products.dto";

const BaseUrl = "/products";

export const getProducts = async () => {
  const response =
    await axiosInstance.get<ApiResponse<IProductsResponse>>(BaseUrl);
  return response.data;
};

export const createProduct = async (props:ICreateProductProps) => {
  const response =
    await axiosInstance.post<ApiPostResponse>(BaseUrl, props);
  return response.data;
};
