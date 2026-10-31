'use client';

import { motion } from 'motion/react';
import { Typography } from '@/components/ui/typography';
import { Flower2, Truck, HandHeart, Sprout, Heart, Sparkles } from 'lucide-react';

const FEATURES = [
    { icon: Flower2, title: 'تازگی، اولویت ماست', description: 'گل‌ها روزانه تهیه می‌شوند تا با طراوت به دستت برسند.' },
    { icon: Truck, title: 'ارسال با دقت و عشق', description: 'بسته‌بندی ایمن و زیبا، مناسب هدیه دادن و غافلگیر کردن.' },
    { icon: HandHeart, title: 'چیدمان دست‌ساز', description: 'هر دسته‌گل با سلیقه‌ی گل‌آراها و توجه به جزئیات آماده می‌شود.' },
    { icon: Sprout, title: 'راهنمای نگهداری گل', description: 'همراه سفارش، نکته‌های ساده برای ماندگاری بیشتر گل‌ها می‌گیری.' },
    { icon: Heart, title: 'هدیه‌ای از طرف تو', description: 'پیام دلخواهت را به کارت هدیه اضافه کن و لحظه‌ای ماندگار بساز.' },
    { icon: Sparkles, title: 'برای هر بودجه و مناسبت', description: 'از یک شاخه‌ی مینیمال تا چیدمان‌های ویژه و باشکوه.' },
];

export const WhyUs = () => {
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
                        چرا گل‌نوش؟
                    </Typography>
                    <Typography variant='body2' className='mt-2 text-muted-foreground'>
                        گل تازه، چیدمان هنرمندانه و هدیه‌ای به‌یادماندنی
                    </Typography>
                </motion.div>
                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                    {FEATURES.map((feature, i) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
                                whileHover={{ y: -4 }}
                                className='flex items-start gap-4 rounded-2xl border border-border bg-card p-5'
                            >
                                <span className='flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent text-primary'>
                                    <Icon className='size-5' />
                                </span>
                                <div>
                                    <Typography variant='body1' weight='bold' className='text-foreground'>
                                        {feature.title}
                                    </Typography>
                                    <Typography variant='body2' className='mt-1 text-muted-foreground'>
                                        {feature.description}
                                    </Typography>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
