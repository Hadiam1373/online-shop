export type AdminOrderStatus = 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export interface IAdminOrderItemProduct {
    id: string;
    name: string;
    description?: string;
    price: number;
    discountPrice?: number;
    stock?: number;
    images?: string[];
    categoryId?: string;
    attributes?: Record<string, string>;
    createdAt?: string;
    updatedAt?: string;
}

export interface IAdminOrderItem {
    id: string;
    orderId: string;
    productId: string;
    quantity: number;
    price: number;
    product?: IAdminOrderItemProduct;
}

export interface IAdminOrderUser {
    id: string;
    email: string;
}

export interface IAdminOrderPayment {
    id: string;
    orderId: string;
    amount: number;
    status: string;
    transactionId?: string;
    createdAt: string;
    updatedAt?: string;
}

export interface IAdminOrder {
    id: string;
    userId: string;
    total: number;
    status: AdminOrderStatus;
    createdAt: string;
    updatedAt: string;
    recipientFirstName?: string | null;
    recipientLastName?: string | null;
    recipientPhone?: string | null;
    province?: string | null;
    city?: string | null;
    address?: string | null;
    postalCode?: string | null;
    deliveryNotes?: string | null;
    user?: IAdminOrderUser;
    orderItems?: IAdminOrderItem[];
    payment?: IAdminOrderPayment;
}

export interface IAdminOrderListResponse {
    data: IAdminOrder[];
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
