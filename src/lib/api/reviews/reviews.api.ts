import axiosInstance from '@/lib/axios';
import { IGetMyReviewsParams, IReviewInput, IUserReviewsResponse } from './reviews.dto';

const Base = '/api/reviews';

export const getMyReviews = async (params?: IGetMyReviewsParams): Promise<IUserReviewsResponse> => {
    const res = await axiosInstance.get(Base, { params });
    return res.data;
};

export const createReview = async (payload: IReviewInput): Promise<any> => {
    const res = await axiosInstance.post(Base, payload);
    return res.data;
};
