export interface IOrderCreate {
    couponCode?: string;
}

export interface IOrderItem {
    id?: string;
    productId: string;
    quantity: number;
    price: number;
    product?: {
        id: string;
        name: string;
        images: string[];
    };
    createdAt?: string;
    updatedAt?: string;
}

export interface IOrderPayment {
    id: string;
    orderId: string;
    method: string;
    status: string;
    transactionId?: string;
    amount: number;
    createdAt: string;
    updatedAt: string;
}

export interface IOrder {
    id: string;
    userId: string;
    total: number;
    status: string;
    createdAt: string;
    updatedAt: string;
    orderItems?: IOrderItem[];
    payment?: IOrderPayment;
}

export interface IPaginationMeta {
    total: number;
    page: number;
    limit: number;
    pages: number;
}

export interface IOrderListResponse {
    data: IOrder[];
    pagination: IPaginationMeta;
}

export interface IGetOrdersParams {
    page: number;
    limit: number;
}
