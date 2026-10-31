'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { Flower2, ArrowLeft } from 'lucide-react';

export const CtaBanner = () => {
    return (
        <section className='mx-auto max-w-[1280px] px-4 py-12 lg:px-8'>
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5 }}
                className='relative overflow-hidden rounded-3xl bg-primary px-6 py-12 text-center text-primary-foreground md:px-12'
            >
                <div className='absolute -top-10 -right-10 size-40 rounded-full bg-white/10' aria-hidden />
                <div className='absolute -bottom-12 -left-12 size-48 rounded-full bg-white/10' aria-hidden />

                <Flower2 className='mx-auto size-10' />
                <Typography as='h2' variant='subtitle1' md-variant='h5' weight='bold' className='mt-4'>
                    برای مناسبت تو، گل مخصوص می‌چینیم
                </Typography>
                <Typography variant='body2' className='mx-auto mt-2 max-w-md text-primary-foreground/80'>
                    ترکیب رنگ و گل‌ها را انتخاب کن؛ گل‌آراهای ما یک دسته‌گل منحصربه‌فرد برایت آماده می‌کنند.
                </Typography>

                <Link href='/products'>
                    <Button size='lg' className='mt-6 rounded-full bg-background px-8 text-primary gap-2 hover:bg-background/90'>
                        سفارش گل دلخواه
                        <ArrowLeft className='size-4' />
                    </Button>
                </Link>
            </motion.div>
        </section>
    );
};
