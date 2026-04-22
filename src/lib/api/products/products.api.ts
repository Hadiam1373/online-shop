import axiosInstance from "@/lib/axios";
import { ApiResponse } from "../shared.dto";
import { IProductsResponse } from "./products.dto";

const BaseUrl = "/products";

export const getProducts = async () => {
  const response =
    await axiosInstance.get<ApiResponse<IProductsResponse>>(BaseUrl);
  return response.data;
};
