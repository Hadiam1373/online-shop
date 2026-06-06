import axiosInstance from "@/lib/axios";
import { IHealthResponse } from "./health.dto";

export const getHealth = async (): Promise<IHealthResponse> => {
  const res = await axiosInstance.get("/api/health");
  return res.data;
};
