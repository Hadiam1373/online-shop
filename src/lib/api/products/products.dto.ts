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
