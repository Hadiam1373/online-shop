'use client';

import { motion } from 'motion/react';
import { Typography } from '@/components/ui/typography';
import { Flower2, Heart, Sparkles } from 'lucide-react';

const MOMENTS = [
    {
        icon: Heart,
        title: 'برای گفتن دوستت دارم',
        text: 'رزهای لطیف و رنگ‌های گرم، حرف دلت را بی‌واسطه و زیبا می‌رسانند.',
    },
    {
        icon: Sparkles,
        title: 'برای تبریک یک اتفاق شیرین',
        text: 'دسته‌گل‌های شاد و رنگارنگ برای تولد، موفقیت و شروع‌های تازه.',
    },
    {
        icon: Flower2,
        title: 'برای حال خوب خانه',
        text: 'گل‌های فصلی و گیاهان سبز، گوشه‌ی دنج خانه را زنده‌تر می‌کنند.',
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
                        گل برای هر لحظه
                    </Typography>
                </motion.div>

                <div className='grid grid-cols-1 gap-5 md:grid-cols-3'>
                    {MOMENTS.map((moment, i) => {
                        const Icon = moment.icon;
                        return (
                            <motion.div
                                key={moment.title}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                                className='flex flex-col gap-4 rounded-2xl border border-border bg-card p-6'
                            >
                                <span className='flex size-11 items-center justify-center rounded-xl bg-accent text-primary'>
                                    <Icon className='size-5' />
                                </span>
                                <Typography variant='body1' weight='bold' className='text-foreground'>
                                    {moment.title}
                                </Typography>
                                <Typography variant='body2' className='text-muted-foreground'>
                                    {moment.text}
                                </Typography>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
