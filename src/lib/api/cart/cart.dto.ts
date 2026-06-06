export interface ICartItemInput {
  productId: string;
  quantity: number;
}

export interface IProduct {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  images: string[];
  stock: number;
}

export interface ICartItem {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  price: number;
  product: IProduct;
  createdAt: string;
  updatedAt: string;
}

export interface ICart {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  cartItems: ICartItem[];
}

export interface ICartResponse {
  cart: ICart;
  subtotal: number;
  total: number;
  itemCount: number;
}

export interface ICartCalculateResponse {
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  itemCount: number;
}
