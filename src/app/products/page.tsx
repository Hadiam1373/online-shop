'use client';

import { Pagination } from '@/components/ui/pagination';
import { useRouter } from 'next/navigation';
import { ProductCart } from './_components';
import { useProducts } from './products.model';
import styles from './products.module.css';

const Products = () => {
    const { products, page, setPage } = useProducts();
    return (
        <div className={styles['products']}>
            <div className={styles['products__list']}>
                <ProductCart/>
            </div>
            <div className='flex w-full justify-center items-center mt-10'>
                <Pagination currentPage={page} onPageChange={setPage} totalPages={products?.pagination?.pages || 1} />
            </div>
        </div>
    );
};

export default Products;
