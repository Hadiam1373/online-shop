export interface IOrderCreate {
    couponCode?: string;
    firstName: string;
    lastName: string;
    province: string;
    city: string;
    address: string;
    postalCode: string;
    deliveryNotes?: string;
}

export interface IOrderCreateResponse {
    order: IOrder;
    calculation: {
        subtotal: number;
        discount: number;
        tax: number;
        total: number;
    };
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
    recipientFirstName: string | null;
    recipientLastName: string | null;
    recipientPhone: string | null;
    province: string | null;
    city: string | null;
    address: string | null;
    postalCode: string | null;
    deliveryNotes: string | null;
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
