import axiosInstance from '@/lib/axios';
import {
    IAddToWishlistParams,
    IRemoveFromWishlistParams,
    IWishlistActionResponse,
    IWishlistCheckResponse,
    IWishlistItemResponse,
    IWishlistResponse,
} from './wishlist.dto';

// Get user's wishlist
export async function getWishlist(page = 1, limit = 10): Promise<IWishlistResponse> {
    const response = await axiosInstance.get<IWishlistResponse>(`/api/wishlist?page=${page}&limit=${limit}`);
    return response.data;
}

// Add product to wishlist
export async function addToWishlist(params: IAddToWishlistParams): Promise<IWishlistItemResponse> {
    const response = await axiosInstance.post<IWishlistItemResponse>('/api/wishlist', params);
    return response.data;
}

// Remove product from wishlist
export async function removeFromWishlist(params: IRemoveFromWishlistParams): Promise<IWishlistActionResponse> {
    const response = await axiosInstance.delete<IWishlistActionResponse>('/api/wishlist', { data: params });
    return response.data;
}

// Check if product is in wishlist
export async function checkWishlist(productId: string): Promise<boolean> {
    const response = await axiosInstance.get<IWishlistCheckResponse>(`/api/wishlist/check?productId=${productId}`);
    return response.data.isInWishlist;
}

// Clear entire wishlist
export async function clearWishlist(): Promise<IWishlistActionResponse> {
    const response = await axiosInstance.delete<IWishlistActionResponse>('/api/wishlist/clear');
    return response.data;
}
