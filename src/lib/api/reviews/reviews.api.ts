import axiosInstance from "@/lib/axios";
import { IReviewInput } from "./reviews.dto";

const Base = "/api/reviews";

export const getMyReviews = async () => {
  const res = await axiosInstance.get(Base);
  return res.data;
};

export const createReview = async (payload: IReviewInput) => {
  const res = await axiosInstance.post(Base, payload);
  return res.data;
};
