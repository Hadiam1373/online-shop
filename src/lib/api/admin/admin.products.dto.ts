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

export type TProductsSort = 'newest' | 'price-asc' | 'price-desc';

export interface IAdminProductsFilters {
    search?: string;
    categoryId?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: TProductsSort;
}
