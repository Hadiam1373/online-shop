'use client';

import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { Pagination } from '@/components/ui/pagination';
import { Skeleton } from '@/components/ui/skeleton';
import { Typography } from '@/components/ui/typography';
import { PackageSearch, Wrench } from 'lucide-react';
import { motion } from 'motion/react';
import { ProductCart, ProductFilters } from './_components';
import { useProducts } from './products.model';
import styles from './products.module.css';

const Products = () => {
    const {
        products,
        isProductsLoading,
        page,
        setPage,
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
    } = useProducts();

    const total = products?.pagination?.total ?? 0;

    return (
        <div className={styles['products']}>
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={styles['products__header']}
            >
                <div className='absolute -top-10 -right-10 size-40 rounded-full bg-white/10' aria-hidden />
                <div className='absolute -bottom-12 -left-12 size-48 rounded-full bg-white/10' aria-hidden />

                <Wrench className='size-9' />
                <Typography as='h1' variant='subtitle1' md-variant='h5' weight='bold' className='mt-3'>
                    محصولات
                </Typography>
                <Typography variant='body2' className='mt-2 max-w-md text-primary-foreground/80'>
                    بهترین قطعات اصلی و باکیفیت خودرو، با جستجو و فیلتر دقیق پیدا کنید
                </Typography>
            </motion.div>

            <ProductFilters
                categories={categories}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                categoryId={categoryId}
                setCategoryId={setCategoryId}
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                sort={sort}
                setSort={setSort}
                hasActiveFilters={hasActiveFilters}
                clearFilters={clearFilters}
            />

            {!isProductsLoading && (
                <Typography variant='body2' className='text-muted-foreground'>
                    {total.toLocaleString('fa')} محصول پیدا شد
                </Typography>
            )}

            {isProductsLoading ? (
                <div className={styles['products__list']}>
                    {Array.from({ length: 12 }).map((_, i) => (
                        <Skeleton key={i} className='aspect-[3/4.2] rounded-2xl' />
                    ))}
                </div>
            ) : !products?.products?.length ? (
                <Empty>
                    <EmptyHeader>
                        <EmptyMedia variant='icon'>
                            <PackageSearch />
                        </EmptyMedia>
                        <EmptyTitle>محصولی پیدا نشد</EmptyTitle>
                        <EmptyDescription>با فیلترهای دیگری دوباره جستجو کنید</EmptyDescription>
                    </EmptyHeader>
                </Empty>
            ) : (
                <div className={styles['products__list']}>
                    <ProductCart products={products?.products} />
                </div>
            )}

            <div className='flex w-full justify-center items-center mt-10'>
                <Pagination currentPage={page} onPageChange={setPage} totalPages={products?.pagination?.pages || 1} />
            </div>
        </div>
    );
};

export default Products;
