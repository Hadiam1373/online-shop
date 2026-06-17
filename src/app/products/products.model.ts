import { useGetAdminProducts } from '@/lib/api/admin/admin.query.products';
import { useGetProduct } from '@/lib/api/products/products.query';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export const useProducts = () => {
    const [page, setPage] = useState(1);
    const params = useParams() as { id?: string };
    const id = params?.id || '';
    const { data: product, isLoading } = useGetProduct(id);
    const { data: products } = useGetAdminProducts(page, 10);
    return { products, page, setPage, product, isLoading };
};
