import axiosInstance from "@/lib/axios";
import { IReviewInput, IUserReviewsResponse } from "./reviews.dto";

const Base = "/api/reviews";

export const getMyReviews = async (): Promise<IUserReviewsResponse> => {
  const res = await axiosInstance.get(Base);
  return res.data;
};

export const createReview = async (payload: IReviewInput): Promise<any> => {
  const res = await axiosInstance.post(Base, payload);
  return res.data;
};
