export interface IAdminCategoryInput {
    name: string;
    description?: string;
    parentId?: string;
}

export interface IAdminCategoryUpdateInput {
    name?: string;
    description?: string;
    parentId?: string;
}

export interface IAdminCategoryResponse {
    id: string;
    name: string;
    description?: string;
    parentId?: string | null;
    createdAt: string;
    parent?: IAdminCategoryResponse | null;
    children: IAdminCategoryResponse[];
    _count: {
        products: number;
    };
}

export interface IAdminCategoriesResponse {
    data: IAdminCategoryResponse[];
    pagination: {
        total: number;
        page: number;
        limit: number;
        pages: number;
    };
}
