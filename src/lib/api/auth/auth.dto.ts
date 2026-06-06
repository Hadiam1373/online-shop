export interface IRegisterParams {
  phone: string;
  email?: string;
  password?: string;
  address?: string;
}

export interface IAuthLoginParams {
  email: string;
  password: string;
}

export interface IAuthLoginResponse {
  accessToken: string;
  refreshToken?: string;
  user?: {
    id: string;
    phone: string;
    email?: string | null;
    address?: string | null;
    role?: string;
  };
}

export interface IOtpRequest {
  phone: string;
}
export interface IOtpVerify {
  phone: string;
  code: string;
}

export interface ICompleteRegistration {
  phone: string;
  email?: string;
  password?: string;
  address?: string;
}

export interface IRefreshParams {
  refreshToken: string;
}

export interface IPasswordResetRequest {
  phone: string;
}
export interface IPasswordResetConfirm {
  phone: string;
  code: string;
  newPassword: string;
  confirmPassword: string;
}
