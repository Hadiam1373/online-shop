'use client';

import { Pagination } from '@/components/ui/pagination';
import { Typography } from '@/components/ui/typography';
import { ProductCart } from './_components';
import { useProducts } from './products.model';
import styles from './products.module.css';

const Products = () => {
    const { products, page, setPage } = useProducts();
    return (
        <div className={styles['products']}>
            <Typography as='h1' variant='subtitle1' md-variant='h6' weight='bold' className='text-foreground'>
                محصولات
            </Typography>
            <div className={styles['products__list']}>
                <ProductCart />
            </div>
            <div className='flex w-full justify-center items-center mt-10'>
                <Pagination currentPage={page} onPageChange={setPage} totalPages={products?.pagination?.pages || 1} />
            </div>
        </div>
    );
};

export default Products;
