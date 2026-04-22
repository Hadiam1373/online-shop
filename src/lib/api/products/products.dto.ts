export interface IProducts {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  stock: number;
  images: string[];
  categoryId: string;
  attributes: Record<string, string>;
  createdAt: string;
  updatedAt: string;
  category: {
    id: string;
    name: string;
    description: string;
    parentId: string;
    createdAt: string;
  };
}

export interface IProductsResponse {
  products: IProducts[];
}

export interface ICreateProductProps {
  name: string;
  description: string;
  price: number;
  discountPrice: number;
  stock: number;
  images: string[];
  categoryId: string;
  attributes: Record<string, string>;
}
