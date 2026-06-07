export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  stock: number;
  images: string[];
  categoryId: string;
  attributes: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface IWishlistItem {
  id: string;
  product: IProduct;
  addedAt: string;
}

export interface IPaginationMeta {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface IWishlistResponse {
  data: IWishlistItem[];
  pagination: IPaginationMeta;
}

export interface IWishlistItemResponse {
  message: string;
  data: IWishlistItem;
}

export interface IWishlistActionResponse {
  message: string;
  deletedCount?: number;
}

export interface IWishlistCheckResponse {
  isInWishlist: boolean;
  productId: string;
}

export interface IAddToWishlistParams {
  productId: string;
}

export interface IRemoveFromWishlistParams {
  productId: string;
}
export interface IGetWishlistParams {
    page: number;
    limit: number;
}