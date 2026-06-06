import axiosInstance from "@/lib/axios";

export const getHealth = async () => {
  const res = await axiosInstance.get("/api/health");
  return res.data;
};
