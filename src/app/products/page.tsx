'use client';

import { Typography } from '@/components/ui/typography';
import { useProducts } from './products.model';
import styles from './products.module.css';
import { Pagination } from '@/components/ui/pagination';

const Products = () => {
    const { products, page, setPage } = useProducts();
    return (
        <div className={styles['products']}>
            <div className={styles['products__list']}>
                {products?.products?.map(product => (
                    <div key={product.id} className={styles['products__item']}>
                        {product.images?.length > 0 ? (
                            <img src={product.images[0]} alt={product.name} className='size-48 object-cover rounded-full mx-auto' />
                        ) : (
                            <div className='w-full h-48 bg-gray-200 rounded-md' />
                        )}
                        <div className='flex items-center justify-between mt-8'>
                            <Typography variant='body1' weight='bold'>
                                {product.name}
                            </Typography>
                        </div>

                        <div className='flex items-center justify-between'>
                            <Typography variant='body1'>قیمت</Typography>
                            <Typography variant='body2'>{product.price.toFixed(2)}</Typography>
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex w-full justify-center items-center mt-10'>
                <Pagination currentPage={page} onPageChange={setPage} totalPages={products?.pagination?.pages || 1} />
            </div>
        </div>
    );
};

export default Products;
