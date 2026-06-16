import axiosInstance from '@/lib/axios';
import {
    IAdminReviewModerationResponse,
    IAdminReviewPendingItem,
    IAdminReviewPendingResponse,
    IAdminReviewStatsResponse,
} from './admin.reviews.dto';

const Base = '/api/reviews';

export const getAdminReviewStats = async (): Promise<IAdminReviewStatsResponse> => {
    const res = await axiosInstance.get(`${Base}/admin/stats`);
    return res.data;
};

export const getAdminPendingReviews = async (): Promise<IAdminReviewPendingResponse> => {
    const res = await axiosInstance.get(`${Base}/admin/pending`);
    return res.data;
};

export const moderateAdminReview = async (id: string, approve: boolean): Promise<IAdminReviewModerationResponse> => {
    const res = await axiosInstance.post(`${Base}/${id}/moderate`, { approve });
    return res.data;
};
