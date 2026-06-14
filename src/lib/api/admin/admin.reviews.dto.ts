export interface IAdminReviewPendingItem {
    id: string;
    userId: string;
    productId: string;
    rating: number;
    comment?: string | null;
    createdAt: string;
    updatedAt: string;
    user?: {
        id: string;
        email?: string | null;
    };
    product?: {
        id: string;
        name: string;
    };
}

export interface IAdminReviewModerationResponse {
    id: string;
    approved: boolean;
    message: string;
}

export interface IAdminReviewStatsResponse {
    totalReviews: number;
    pendingReviews: number;
    approvedReviews: number;
    rejectedReviews: number;
}
