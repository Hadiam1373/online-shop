'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ChevronDown, ShieldCheck, Truck } from 'lucide-react';

const HEADLINE_WORDS = ['قطعه', 'موتور', 'خودروت', 'رو', 'با', 'خاطرجمعی', 'پیدا', 'کن'];

const container = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.07, delayChildren: 0.1 },
    },
};

const wordVariant = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export const Hero = () => {
    return (
        <section className='relative overflow-hidden border-b border-border'>
            <div className='absolute inset-0 -z-10 bg-linear-to-bl from-primary/10 via-background to-background' />
            <motion.div
                className='absolute -top-24 -left-24 -z-10 size-72 rounded-full bg-primary/10 blur-3xl'
                animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className='mx-auto flex max-w-[1280px] flex-col-reverse items-center gap-10 px-4 pt-14 pb-20 md:flex-row md:py-24 lg:px-8'>
                <div className='flex flex-1 flex-col items-start gap-5 text-right'>
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className='rounded-full bg-accent px-4 py-1 text-sm font-medium text-accent-foreground'
                    >
                        فروشگاه آنلاین قطعات یدکی موتور
                    </motion.span>

                    <motion.h1
                        variants={container}
                        initial='hidden'
                        animate='show'
                        className='flex flex-wrap justify-end gap-x-2.5 text-3xl font-bold leading-[1.4] text-foreground md:text-4xl lg:text-5xl'
                    >
                        {HEADLINE_WORDS.map((word, i) => (
                            <motion.span key={i} variants={wordVariant} className='inline-block'>
                                {word}
                            </motion.span>
                        ))}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                        className='max-w-md text-muted-foreground'
                    >
                        بیش از ده‌ها هزار قطعه اصلی و باکیفیت برای انواع خودروهای ایرانی و خارجی، با ضمانت اصالت و ارسال سریع به سراسر کشور.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.85 }}
                        className='flex flex-wrap items-center gap-3'
                    >
                        <Link href='/products'>
                            <Button size='lg' className='rounded-full px-8 gap-2'>
                                مشاهده محصولات
                                <ArrowLeft className='size-4' />
                            </Button>
                        </Link>
                        <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                            <ShieldCheck className='size-4 text-primary' />
                            ضمانت اصالت کالا
                        </div>
                        <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                            <Truck className='size-4 text-primary' />
                            ارسال سریع
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className='flex flex-1 items-center justify-center'
                >
                    <motion.div
                        animate={{ y: [0, -14, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                        className='flex size-56 items-center justify-center rounded-4xl bg-card shadow-md ring-1 ring-foreground/5 md:size-72'
                    >
                        <Image src='/image/logo.png' alt='کویر یدک' width={200} height={200} className='h-auto w-2/3 object-contain' />
                    </motion.div>
                </motion.div>
            </div>

            <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                className='absolute inset-x-0 bottom-4 flex flex-col items-center gap-1 text-muted-foreground'
            >
                <span className='text-xs'>اسکرول کنید</span>
                <ChevronDown className='size-4' />
            </motion.div>
        </section>
    );
};
