'use client';

import { Button } from '@/components/ui/button';
import { motion, useReducedMotion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ChevronDown, Flower2, Leaf } from 'lucide-react';

export const Hero = () => {
    const shouldReduceMotion = useReducedMotion();

    return (
        <section className='relative overflow-hidden border-b border-border bg-background'>
            <div className='absolute inset-0 -z-10 bg-linear-to-l from-accent/70 via-background to-background' />
            <motion.div
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className='absolute -top-24 -left-24 -z-10 size-72 rounded-full bg-primary/20 blur-3xl'
                aria-hidden='true'
            />

            <div className='mx-auto flex max-w-[1280px] flex-col-reverse items-center gap-10 px-4 pt-12 pb-20 md:flex-row md:py-20 lg:px-8'>
                <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, x: 28 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.65, ease: 'easeOut', staggerChildren: 0.12 }}
                    className='flex flex-1 flex-col items-start gap-5 text-right'
                >
                    <motion.span
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className='rounded-full border border-primary/15 bg-white/70 px-4 py-1.5 text-sm font-medium text-primary'
                    >
                        گل‌فروشی آنلاین گل‌نوش · گل تازه، هر روز
                    </motion.span>

                    <motion.h1
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.22 }}
                        className='text-4xl font-bold leading-[1.35] text-foreground md:text-5xl lg:text-6xl'
                    >
                        یک شاخه گل، یک دنیا حال خوب
                    </motion.h1>

                    <motion.p
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.34 }}
                        className='max-w-md text-muted-foreground'
                    >
                        برای تولد، قرارهای عاشقانه یا یک روز معمولی؛ دسته‌گل دلخواهت را با گل‌های تازه و چیدمان دست‌ساز ما انتخاب کن.
                    </motion.p>

                    <motion.div
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.46 }}
                        className='flex flex-wrap items-center gap-3'
                    >
                        <Link href='/products'>
                            <Button size='lg' className='rounded-full px-8 gap-2 transition-transform hover:scale-[1.03] active:scale-[0.98]'>
                                دیدن دسته‌گل‌ها
                                <ArrowLeft className='size-4' />
                            </Button>
                        </Link>
                        <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                            <Flower2 className='size-4 text-primary' />
                            گل‌آرایی دست‌ساز
                        </div>
                        <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                            <Leaf className='size-4 text-primary' />
                            گل تازه و باطراوت
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.94, y: 18 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
                    className='flex w-full flex-1 items-center justify-center md:w-auto'
                >
                        <motion.div
                            animate={shouldReduceMotion ? undefined : { y: [0, -8, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                            className='relative h-[330px] w-full max-w-[470px] overflow-hidden rounded-[48%_48%_24px_24px] shadow-2xl shadow-primary/15 ring-8 ring-white/70 md:h-[490px]'
                        >
                            <Image
                                src='/image/hero.jpg'
                                alt='دسته‌گل تازه و رنگارنگ گل‌نوش، مناسب هدیه و مناسبت‌های خاص'
                                fill
                                sizes='(max-width: 767px) calc(100vw - 32px), (max-width: 1279px) 38vw, 470px'
                                quality={50}
                                preload
                                fetchPriority='high'
                                className='object-cover'
                            />
                            <motion.div
                                initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.45, delay: 0.75 }}
                                className='absolute bottom-5 right-5 rounded-2xl bg-white/90 px-4 py-3 shadow-lg backdrop-blur'
                            >
                                <p className='text-sm font-bold text-foreground'>هدیه‌ای از دل طبیعت</p>
                                <p className='mt-1 text-xs text-muted-foreground'>با عشق، برای عزیزانت</p>
                            </motion.div>
                        </motion.div>
                </motion.div>
            </div>

            <div className='absolute inset-x-0 bottom-4 flex flex-col items-center gap-1 text-muted-foreground'>
                <span className='text-xs'>اسکرول کنید</span>
                <motion.span
                    animate={shouldReduceMotion ? undefined : { y: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    aria-hidden='true'
                >
                    <ChevronDown className='size-4' />
                </motion.span>
            </div>
        </section>
    );
};
