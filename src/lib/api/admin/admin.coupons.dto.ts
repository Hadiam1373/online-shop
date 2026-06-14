export interface IAdminCouponInput {
    code: string;
    discountType: 'PERCENTAGE' | 'FIXED';
    discountValue: number;
    expirationDate?: string;
    usageLimit?: number;
}

export interface IAdminCouponUpdateInput {
    code?: string;
    discountType?: 'PERCENTAGE' | 'FIXED';
    discountValue?: number;
    expirationDate?: string;
    usageLimit?: number;
}

export interface IAdminCoupon {
    id: string;
    code: string;
    discountType: 'PERCENTAGE' | 'FIXED';
    discountValue: number;
    expirationDate?: string;
    usageLimit?: number;
    createdAt: string;
    updatedAt: string;
}

export interface IAdminCouponStatsResponse {
    totalCoupons: number;
    activeCoupons: number;
    expiredCoupons: number;
    usedCoupons: number;
}
