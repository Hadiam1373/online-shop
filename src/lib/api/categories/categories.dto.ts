export interface ICategory {
  id: string;
  name: string;
  description?: string;
  parentId?: string | null;
  createdAt: string;
}

export interface ICategoryInput {
  name: string;
  description?: string;
  parentId?: string | null;
}
