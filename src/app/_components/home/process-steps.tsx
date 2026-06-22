'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { Typography } from '@/components/ui/typography';
import { Search, ShoppingCart, CreditCard, Truck } from 'lucide-react';

const STEPS = [
    { icon: Search, title: 'جستجو و انتخاب', description: 'بین هزاران محصول اصل جستجو کنید و انتخاب کنید' },
    { icon: ShoppingCart, title: 'افزودن به سبد', description: 'محصول مورد نظر‌تون رو سبد خریدتون اضافه کنید' },
    { icon: CreditCard, title: 'پرداخت امن', description: 'پرداخت آنلاین از طریق درگاه‌های معتبر بانکی' },
    { icon: Truck, title: 'ارسال و تحویل', description: 'دریافت بسته‌تون در کمترین زمان' },
];

const StepRow = ({ step, index, progress }: { step: (typeof STEPS)[number]; index: number; progress: MotionValue<number> }) => {
    const start = index / STEPS.length;
    const scale = useTransform(progress, [Math.max(start - 0.08, 0), start + 0.08], [0.85, 1]);
    const opacity = useTransform(progress, [Math.max(start - 0.08, 0), start + 0.08], [0.35, 1]);
    const Icon = step.icon;

    return (
        <div className='relative flex items-start gap-5 pb-12 last:pb-0'>
            <motion.span
                style={{ scale, opacity }}
                className='relative z-10 flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md shadow-primary/20'
            >
                <Icon className='size-6' />
            </motion.span>
            <motion.div style={{ opacity }} className='pt-2'>
                <Typography variant='body1' weight='bold' className='text-foreground'>
                    {step.title}
                </Typography>
                <Typography variant='body2' className='mt-1 text-muted-foreground'>
                    {step.description}
                </Typography>
            </motion.div>
        </div>
    );
};

export const ProcessSteps = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start 0.7', 'end 0.4'] });
    const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

    return (
        <section className='mx-auto max-w-[1280px] px-4 py-16 lg:px-8'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
                className='mb-12 text-center'
            >
                <Typography as='h2' variant='subtitle1' md-variant='h5' weight='bold' className='text-foreground'>
                    خرید در ۴ قدم ساده
                </Typography>
                <Typography variant='body2' className='mt-2 text-muted-foreground'>
                    از انتخاب محصول تا تحویل درب منزل
                </Typography>
            </motion.div>

            <div ref={containerRef} className='relative mx-auto max-w-xl'>
                <div className='absolute right-7 top-2 bottom-2 w-0.5 bg-border' aria-hidden />
                <motion.div style={{ height: lineHeight }} className='absolute right-7 top-2 w-0.5 origin-top bg-primary' aria-hidden />
                {STEPS.map((step, i) => (
                    <StepRow key={step.title} step={step} index={i} progress={scrollYProgress} />
                ))}
            </div>
        </section>
    );
};
