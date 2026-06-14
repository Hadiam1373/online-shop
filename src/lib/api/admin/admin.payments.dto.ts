export interface IAdminPayment {
    id: string;
    orderId: string;
    method: string;
    status: string;
    transactionId?: string;
    amount: number;
    createdAt: string;
    updatedAt: string;
}

export interface IAdminPaymentStatsResponse {
    totalPayments: number;
    totalAmount: number;
    successfulPayments: number;
    failedPayments: number;
    pendingPayments: number;
}

export interface IAdminPaymentRefundResponse {
    paymentId: string;
    refunded: boolean;
    message: string;
}
