export interface ILoginParams {
  email: string;
  password: string;
}

export interface ILoginResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    role: "ADMIN" | "USER";
  };
}

export interface IRegisterResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    phone: string;
    address: string;
    role: "ADMIN" | "USER";
  };
}

export interface IRegisterParams {
  email: string;
  password: string;
  phone: string;
  address: string;
}
