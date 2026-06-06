export interface ICouponValidation {
  code: string;
}

export interface ICoupon {
  id: string;
  code: string;
  discountType: "PERCENTAGE" | "FIXED";
  discountValue: number;
  usageLimit: number;
  usedCount: number;
  expirationDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICouponInput {
  code: string;
  discountType: "PERCENTAGE" | "FIXED";
  discountValue: number;
  usageLimit?: number;
  expirationDate?: string;
}
