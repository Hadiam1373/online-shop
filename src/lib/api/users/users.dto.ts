export interface IUserProfileResponse {
  id: string;
  email: string | null;
  phone: string;
  address: string | null;
  role: "USER" | "ADMIN" | "OPERATOR";
  createdAt: string;
  updatedAt: string;
  _count: {
    orders: number;
    reviews: number;
  };
}

export interface IUpdateProfileParams {
  email?: string | null;
}

export interface IUpdateUserProfile {
  email?: string | null;
  address?: string | null;
}
