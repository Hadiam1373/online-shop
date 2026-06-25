'use client';

import { motion } from 'motion/react';
import { Typography } from '@/components/ui/typography';
import { ShieldCheck, Truck, Headset, Wallet, RotateCcw, Sparkles } from 'lucide-react';
import Image from 'next/image';

const FEATURES = [
    { icon: ShieldCheck, title: 'ضمانت اصالت محصول', description: 'تمام محصولات دارای ضمانت اصالت و سلامت بسته‌بندی هستند' },
    { icon: Truck, title: 'ارسال سریع و ایمن', description: 'ارسال در سریع‌ترین زمان با بسته‌بندی ایمن در سراسر کشور' },
    { icon: Headset, title: 'مشاوره متخصص رایگان', description: 'پیش از خرید با متخصصان پوست‌شناسی ما مشورت کنید' },
    { icon: Wallet, title: 'پرداخت امن و مطمئن', description: 'پرداخت آنلاین از طریق درگاه‌های معتبر بانکی' },
    { icon: RotateCcw, title: 'بازگشت آسان کالا', description: 'بازگشت محصول تا ۱۰ روز بدون شرط' },
    { icon: Sparkles, title: 'برندهای معروف جهانی', description: 'دسترسی به بهترین و مطمئن‌ترین برندهای جهان' },
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
                        چرا نگار بیوتی؟
                    </Typography>
                    <Typography variant='body2' className='mt-2 text-muted-foreground'>
                        خریدی ایمن، متخصصانه و بدون دردسر
                    </Typography>
                </motion.div>
                <Image
                    loading='eager'
                    src='/image/banner.webp'
                    alt='چرا نگار بیوتی؟'
                    width={600}
                    height={400}
                    className='w-auto mx-auto my-10'
                />

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
