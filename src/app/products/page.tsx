'use client';

import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { Pagination } from '@/components/ui/pagination';
import { Skeleton } from '@/components/ui/skeleton';
import { Typography } from '@/components/ui/typography';
import { PackageSearch, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { Suspense } from 'react';
import { ProductCart, ProductFilters } from './_components';
import { useProducts } from './products.model';
import styles from './products.module.css';

const ProductsContent = () => {
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

    const selectedCategory = categories?.data?.find(category => category.id === categoryId);
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

                <Sparkles className='size-9' />
                <Typography as='h1' variant='subtitle1' md-variant='h5' weight='bold' className='mt-3'>
                    {selectedCategory?.name ?? 'گل‌ها و هدیه‌ها'}
                </Typography>
                <Typography variant='body2' className='mt-2 max-w-md text-primary-foreground/80'>
                    دسته‌گل تازه، گل مناسبتی و گیاه آپارتمانی دلخواهت را پیدا کن؛ ما با عشق آماده و ارسال می‌کنیم.
                </Typography>
            </motion.div>

            <ProductFilters
                categories={categories?.data}
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
                        <EmptyTitle>
                            <Typography>محصولی پیدا نشد</Typography>
                        </EmptyTitle>
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

const Products = () => (
    <Suspense
        fallback={
            <div className={styles['products']}>
                <Skeleton className='h-40 rounded-3xl' />
                <Skeleton className='h-24 rounded-2xl' />
                <div className={styles['products__list']}>
                    {Array.from({ length: 8 }).map((_, index) => (
                        <Skeleton key={index} className='aspect-[3/4.2] rounded-2xl' />
                    ))}
                </div>
            </div>
        }
    >
        <ProductsContent />
    </Suspense>
);

export default Products;
