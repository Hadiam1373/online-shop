export type AdminOrderStatus = 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export interface IAdminOrder {
    id: string;
    userId: string;
    total: number;
    status: AdminOrderStatus;
    createdAt: string;
    updatedAt: string;
    orderItems?: {
        id: string;
        productId: string;
        quantity: number;
        price: number;
    }[];
}

export interface IAdminOrderStatusUpdateRequest {
    status: AdminOrderStatus;
}

export interface IAdminOrderStatsResponse {
    totalOrders: number;
    totalRevenue: number;
    pendingOrders: number;
    paidOrders: number;
    shippedOrders: number;
    deliveredOrders: number;
    cancelledOrders: number;
}
