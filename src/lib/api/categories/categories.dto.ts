export interface ICategory {
    id: string;
    name: string;
    description?: string;
    parentId?: string | null;
    createdAt: string;
}

export interface ICategoryResponse {
    data: ICategory[];
    pagination: IPaginationMeta;
}

export interface IPaginationMeta {
    total: number;
    page: number;
    limit: number;
    pages: number;
}

export interface ICategoryInput {
    name: string;
    description?: string;
    parentId?: string | null;
}
