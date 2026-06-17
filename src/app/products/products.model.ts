import { useGetAdminProducts } from '@/lib/api/admin/admin.query.products';
import { useGetProduct } from '@/lib/api/products/products.query';
import { useAddToWishlist } from '@/lib/api/wishlist';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export const useProducts = () => {
    const [page, setPage] = useState(1);
    const params = useParams() as { id?: string };
    const id = params?.id || '';
    const { data: product, isLoading } = useGetProduct(id);
    const { data: products } = useGetAdminProducts(page, 10);
    const { mutateAsync: addToWishlist } = useAddToWishlist();
    const addProductToWhishloist = async () => {
        try {
            await addToWishlist({ productId: id });
            toast.success('محصول با موفقیت به لیست مورد علاقه شما اضافه شد .');
        } catch (err) {
            console.log(err);
        }
    };
    return { products, page, setPage, product, isLoading, addProductToWhishloist };
};
