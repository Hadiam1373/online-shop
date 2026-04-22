export interface ApiResponse<T> {
  data: T;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface ApiPostResponse{
  message: string;
} 