'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { useGetProducts } from '@/lib/api/products/products.query';
import { ArrowLeft, PackageSearch } from 'lucide-react';

export const FeaturedProducts = () => {
    const { data, isLoading } = useGetProducts({ params: { page: 1, limit: 8 } });
    const router = useRouter();
    const products = data?.products?.slice(0, 8) ?? [];

    return (
        <section className='mx-auto max-w-[1280px] px-4 py-16 lg:px-8'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
                className='mb-8 flex flex-wrap items-end justify-between gap-3'
            >
                <div>
                    <Typography as='h2' variant='subtitle1' md-variant='h5' weight='bold' className='text-foreground'>
                        انتخاب‌های محبوب گل‌نوش
                    </Typography>
                    <Typography variant='body2' className='mt-2 text-muted-foreground'>
                        دسته‌گل‌هایی که این روزها بیشتر به دل می‌نشینند
                    </Typography>
                </div>
                <Link href='/products'>
                    <Button variant='outline' size='sm' className='gap-2'>
                        مشاهده همه
                        <ArrowLeft className='size-4' />
                    </Button>
                </Link>
            </motion.div>

            {isLoading ? (
                <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4'>
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i} className='aspect-3/4 rounded-2xl' />
                    ))}
                </div>
            ) : products.length === 0 ? (
                <Empty>
                    <EmptyHeader>
                        <EmptyMedia variant='icon'>
                            <PackageSearch />
                        </EmptyMedia>
                        <EmptyTitle>
                            <Typography>هنوز محصولی ثبت نشده است</Typography>
                        </EmptyTitle>
                    </EmptyHeader>
                </Empty>
            ) : (
                <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4'>
                    {products.map((product, i) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.4, delay: (i % 4) * 0.08 }}
                            whileHover={{ y: -4 }}
                            onClick={() => router.push(`/products/${product.id}`)}
                            role='button'
                            className='cursor-pointer rounded-2xl border border-border bg-card p-3 transition-shadow hover:shadow-md md:p-4'
                        >
                            {product.images?.length > 0 ? (
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className='aspect-square w-full rounded-xl bg-muted object-cover'
                                />
                            ) : (
                                <div className='aspect-square w-full rounded-xl bg-muted' />
                            )}
                            <Typography
                                variant='body2'
                                md-variant='body1'
                                weight='bold'
                                className='mt-3 line-clamp-2 min-h-10 text-foreground'
                            >
                                {product.name}
                            </Typography>
                            <Typography variant='body1' weight='bold' className='mt-1 text-primary'>
                                {product.price.toLocaleString('fa')} تومان
                            </Typography>
                        </motion.div>
                    ))}
                </div>
            )}
        </section>
    );
};
