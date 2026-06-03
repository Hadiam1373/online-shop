export interface IUserProfileResponse {
    id: string;
    email: string | null;
    phone: string;
    address: string | null;
    role: 'USER';
    createdAt: string;
    updatedAt: string;
    _count: {
        orders: number;
        reviews: number;
    };
}

export interface IUpdateProfileParams {
    email: string;
}

