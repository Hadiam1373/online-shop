'use client';

import { motion } from 'motion/react';
import { Typography } from '@/components/ui/typography';
import Rating from '@/components/ui/rating';
import { Quote } from 'lucide-react';

const TESTIMONIALS = [
    {
        name: 'علی محمدی',
        city: 'تهران',
        text: 'قطعه موتور پراید رو دقیقاً مطابق توضیحات سفارش دادم و زودتر از موعد رسید. کیفیت عالی بود.',
        rating: 5,
    },
    {
        name: 'سارا احمدی',
        city: 'اصفهان',
        text: 'پشتیبانی فنی خیلی کمک کرد قطعه درست رو برای پژو ۲۰۶ پیدا کنم. قیمت‌ها هم منصفانه بود.',
        rating: 5,
    },
    {
        name: 'رضا کریمی',
        city: 'شیراز',
        text: 'برای اولین بار بود آنلاین قطعه یدکی می‌خریدم، تجربه خیلی خوبی بود و حتماً دوباره خرید می‌کنم.',
        rating: 4,
    },
];

export const Testimonials = () => {
    return (
        <section className='bg-muted/30 py-16'>
            <div className='mx-auto max-w-[1280px] px-4 lg:px-8'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5 }}
                    className='mb-10 text-center'
                >
                    <Typography as='h2' variant='subtitle1' md-variant='h5' weight='bold' className='text-foreground'>
                        نظر مشتریان ما
                    </Typography>
                </motion.div>

                <div className='grid grid-cols-1 gap-5 md:grid-cols-3'>
                    {TESTIMONIALS.map((t, i) => (
                        <motion.div
                            key={t.name}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                            className='flex flex-col gap-4 rounded-2xl border border-border bg-card p-6'
                        >
                            <Quote className='size-6 text-primary/40' />
                            <Typography variant='body2' className='text-foreground'>
                                {t.text}
                            </Typography>
                            <div className='mt-auto flex items-center justify-between border-t border-border pt-4'>
                                <div>
                                    <Typography variant='body2' weight='bold' className='text-foreground'>
                                        {t.name}
                                    </Typography>
                                    <Typography variant='caption' className='text-muted-foreground'>
                                        {t.city}
                                    </Typography>
                                </div>
                                <Rating value={t.rating} readOnly size='sm' />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
