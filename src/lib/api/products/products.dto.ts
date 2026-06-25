export interface IProduct {
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
    category: {
        id: string;
        name: string;
        description: string;
        parentId: null;
        createdAt: string;
    };
}

export interface IProductInput {
    name: string;
    description?: string;
    price: number;
    discountPrice?: number;
    stock: number;
    images: string[];
    categoryId: string;
    attributes?: Record<string, any>;
}

export interface IProductsResponse {
    products: IProduct[];
    pagination: {
        total: number;
        page: number;
        pageSize: number;
    };
}
export interface IProductParams {
    page?: number;
    limit?: number;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    availability?: 'in-stock' | 'out-of-stock';
    sort?:
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
}
