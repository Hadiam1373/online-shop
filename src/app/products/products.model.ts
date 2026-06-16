import { useGetAdminProducts } from '@/lib/api/admin/admin.query.products';
import { useState } from 'react';

export const useProducts = () => {
    const [page, setPage] = useState(1);
    const { data: products } = useGetAdminProducts(page, 10);
    return { products, page, setPage };
};
