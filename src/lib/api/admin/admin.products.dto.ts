export interface IAdminProductInput {
    name: string;
    description?: string;
    price: number;
    discountPrice?: number;
    stock: number;
    images: string[];
    categoryId: string;
    attributes?: Record<string, any>;
}

export interface IAdminProductResponse {
    id: string;
    name: string;
    description?: string;
    price: number;
    discountPrice?: number;
    stock: number;
    images: string[];
    categoryId: string;
    attributes?: Record<string, any>;
    createdAt: string;
    updatedAt: string;
}

export interface IAdminProductsResponse {
    products: IAdminProductResponse[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}

export type TProductsSort =
    | 'createdAt_desc'
    | 'createdAt_asc'
    | 'price_desc'
    | 'price_asc'
    | 'name_desc'
    | 'name_asc'
    | 'stock_desc'
    | 'stock_asc'
    | 'discount_desc'
    | 'discount_asc';

export interface IAdminProductsFilters {
    search?: string;
    categoryId?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: TProductsSort;
}
