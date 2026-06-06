export interface IReviewInput {
  productId: string;
  rating: number;
  comment?: string;
}

export interface IReview {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  comment?: string | null;
  moderated: boolean;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    email?: string;
  };
  product?: {
    id: string;
    name: string;
    images?: string[];
  };
}

export interface IPaginationMeta {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface IUserReviewsResponse {
  data: IReview[];
  pagination: IPaginationMeta;
}
