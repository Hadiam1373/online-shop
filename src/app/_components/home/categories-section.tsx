'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { Typography } from '@/components/ui/typography';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetCategories } from '@/lib/api/categories/categories.query';
import { Palette, Droplet, Wind, Heart, Eye, Sparkles } from 'lucide-react';

const ICONS = [Palette, Droplet, Wind, Heart, Eye, Sparkles];

const FALLBACK_CATEGORIES = [
    { id: 'makeup', name: 'آرایش صورت' },
    { id: 'skincare', name: 'مراقبت پوست' },
    { id: 'haircare', name: 'مراقبت موی سر' },
    { id: 'fragrances', name: 'عطر و ادکلن' },
    { id: 'eyecare', name: 'مراقبت چشم' },
    { id: 'supplements', name: 'مکمل‌های زیبایی' },
];

export const CategoriesSection = () => {
    const { data, isLoading } = useGetCategories();
    const categories = data?.data && data?.data?.length > 0 ? data?.data : FALLBACK_CATEGORIES;

    return (
        <section className='mx-auto max-w-[1280px] px-4 py-16 lg:px-8'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
                className='mb-8 text-center'
            >
                <Typography as='h2' variant='subtitle1' md-variant='h5' weight='bold' className='text-foreground'>
                    دسته‌بندی محصولات
                </Typography>
                <Typography variant='body2' className='mt-2 text-muted-foreground'>
                    محصولات مورد نیاز خودت رو براحتی پیدا کن
                </Typography>
            </motion.div>

            {isLoading ? (
                <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6'>
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Skeleton key={i} className='h-28 rounded-2xl' />
                    ))}
                </div>
            ) : (
                <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6'>
                    {categories?.slice(0, 6).map((cat, i) => {
                        const Icon = ICONS[i % ICONS.length];
                        return (
                            <motion.div
                                key={cat.id}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.4, delay: i * 0.06 }}
                            >
                                <Link
                                    href='/products'
                                    className='group flex h-28 flex-col items-center justify-center gap-2 rounded-2xl border border-border bg-card p-3 text-center transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-md'
                                >
                                    <span className='flex size-10 items-center justify-center rounded-xl bg-accent text-primary transition-transform group-hover:scale-110'>
                                        <Icon className='size-5' />
                                    </span>
                                    <Typography variant='caption' weight='bold' className='line-clamp-2 text-foreground'>
                                        {cat.name}
                                    </Typography>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>
            )}
        </section>
    );
};
