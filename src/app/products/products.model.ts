import { useGetAdminProducts } from '@/lib/api/admin/admin.query.products';
import { useAddToCart } from '@/lib/api/cart/cart.query';
import { useGetProduct } from '@/lib/api/products/products.query';
import { useAddToWishlist } from '@/lib/api/wishlist';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export const useProducts = () => {
    const [page, setPage] = useState(1);
    const params = useParams() as { id?: string };
    const id = params?.id || '';
    const { data: product, isLoading } = useGetProduct(id);
    const { data: products } = useGetAdminProducts(page, 10);
    const queryClient = useQueryClient();
    const { mutateAsync: addToWishlist } = useAddToWishlist();
    const { mutateAsync: addToCart } = useAddToCart();

    const addToCartHandler = async (data: { productId: string; quantity: number }) => {
        try {
            await addToCart(data);
            await queryClient.invalidateQueries({ queryKey: ['cart'] });
            toast.success('محصول با موفقیت به سبد خرید شما اضافه شد .');
        } catch (err) {
            console.log(err);
        }
    };
    const addProductToWhishloist = async () => {
        try {
            await addToWishlist({ productId: id });
            await queryClient.invalidateQueries({ queryKey: ['wishlist'] });
            toast.success('محصول با موفقیت به لیست مورد علاقه شما اضافه شد .');
        } catch (err) {
            console.log(err);
        }
    };
    return { products, page, setPage, product, isLoading, addProductToWhishloist, addToCartHandler };
};
