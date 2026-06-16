export interface IAdminPaymentOrderUser {
    id: string;
    email: string;
}

export interface IAdminPaymentOrder {
    id: string;
    userId: string;
    total: number;
    status: string;
    createdAt: string;
    updatedAt: string;
    user?: IAdminPaymentOrderUser;
}

export interface IAdminPayment {
    id: string;
    orderId: string;
    amount: number;
    status: string;
    transactionId?: string;
    createdAt: string;
    order?: IAdminPaymentOrder;
}

export interface IAdminPaymentListResponse {
    data: IAdminPayment[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        pages: number;
    };
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
