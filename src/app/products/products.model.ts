import { useGetAdminProducts } from '@/lib/api/admin/admin.query.products';
import { TProductsSort } from '@/lib/api/admin/admin.products.dto';
import { useAddToCart } from '@/lib/api/cart/cart.query';
import { useGetCategories } from '@/lib/api/categories/categories.query';
import { useGetProduct } from '@/lib/api/products/products.query';
import { useAddToWishlist } from '@/lib/api/wishlist';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

export const useProducts = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sort, setSort] = useState<TProductsSort>('createdAt_desc');

    const params = useParams() as { id?: string };
    const id = params?.id || '';
    const { data: product, isLoading } = useGetProduct(id);
    const { data: categories } = useGetCategories();

    useEffect(() => {
        const timeout = setTimeout(() => setSearch(searchInput.trim()), 400);
        return () => clearTimeout(timeout);
    }, [searchInput]);

    useEffect(() => {
        setPage(1);
    }, [search, categoryId, minPrice, maxPrice, sort]);

    const filters = useMemo(
        () => ({
            search: search || undefined,
            categoryId: categoryId || undefined,
            minPrice: minPrice ? Number(minPrice) : undefined,
            maxPrice: maxPrice ? Number(maxPrice) : undefined,
            sort,
        }),
        [search, categoryId, minPrice, maxPrice, sort],
    );

    const hasActiveFilters = Boolean(search || categoryId || minPrice || maxPrice);

    const clearFilters = () => {
        setSearchInput('');
        setSearch('');
        setCategoryId('');
        setMinPrice('');
        setMaxPrice('');
        setSort('createdAt_desc');
    };

    const { data: products, isLoading: isProductsLoading } = useGetAdminProducts(page, 12, filters);
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
    return {
        products,
        isProductsLoading,
        page,
        setPage,
        product,
        isLoading,
        addProductToWhishloist,
        addToCartHandler,
        categories,
        searchInput,
        setSearchInput,
        categoryId,
        setCategoryId,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        sort,
        setSort,
        hasActiveFilters,
        clearFilters,
    };
};
