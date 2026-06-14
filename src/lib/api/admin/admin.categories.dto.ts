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
}
