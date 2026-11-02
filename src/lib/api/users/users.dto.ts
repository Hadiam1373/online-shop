export interface IUserProfileResponse {
  id: string;
  email: string | null;
  phone: string;
  address: string | null;
  firstName: string | null;
  lastName: string | null;
  province: string | null;
  city: string | null;
  postalCode: string | null;
  deliveryNotes: string | null;
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
  firstName?: string | null;
  lastName?: string | null;
  province?: string | null;
  city?: string | null;
  address?: string | null;
  postalCode?: string | null;
  deliveryNotes?: string | null;
}

export interface IChangePasswordParams {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}