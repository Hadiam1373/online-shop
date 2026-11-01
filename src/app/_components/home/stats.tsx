'use client';

import { motion } from 'motion/react';
import { Typography } from '@/components/ui/typography';

const STATS = [
    { value: 'تازه', label: 'گل‌هایی برای حال خوب' },
    { value: 'دست‌ساز', label: 'چیدمان با سلیقه‌ی تو' },
    { value: 'هدیه', label: 'پیامی از طرف تو' },
    { value: 'آسان', label: 'سفارش در چند قدم' },
];

export const Stats = () => {
    return (
        <section className='border-b border-border bg-muted/30'>
            <div className='mx-auto grid max-w-[1280px] grid-cols-2 gap-6 px-4 py-12 md:grid-cols-4 lg:px-8'>
                {STATS.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className='flex flex-col items-center gap-1 text-center'
                    >
                        <Typography as='p' variant='h6' weight='bold' className='text-primary'>
                            {stat.value}
                        </Typography>
                        <Typography variant='body2' className='text-muted-foreground'>
                            {stat.label}
                        </Typography>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
