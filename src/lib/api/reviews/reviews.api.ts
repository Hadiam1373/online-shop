import axiosInstance from '@/lib/axios';
import { IGetMyReviewsParams, IProductReviewResponse, IReview, IReviewInput, IUserReviewsResponse } from './reviews.dto';

const Base = '/api/reviews';

export const getMyReviews = async (params?: IGetMyReviewsParams): Promise<IUserReviewsResponse> => {
    const res = await axiosInstance.get(Base, { params });
    return res.data;
};

export const createReview = async (payload: IReviewInput): Promise<any> => {
    const res = await axiosInstance.post(Base, payload);
    return res.data;
};

export const deleteReview = async (reviewId: string): Promise<any> => {
    const res = await axiosInstance.delete(`${Base}/${reviewId}`);
    return res.data;
};

export const editReview = async (reviewId: string, payload: IReviewInput): Promise<any> => {
    const res = await axiosInstance.put(`${Base}/${reviewId}`, payload);
    return res.data;
};

export const getProductReview = async (productId: string): Promise<IProductReviewResponse> => {
    const res = await axiosInstance.get(`${Base}/product/${productId}`);
    return res.data;
};
