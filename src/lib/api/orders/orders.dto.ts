export interface IOrderCreate {
  couponCode?: string;
}

export interface IOrder {
  id: string;
  total: number;
  status: string;
  createdAt: string;
}
