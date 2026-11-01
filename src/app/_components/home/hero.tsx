import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ChevronDown, Flower2, Leaf } from 'lucide-react';

export const Hero = () => {
    return (
        <section className='relative overflow-hidden border-b border-border bg-[#f7f5ec]'>
            <div className='absolute inset-0 -z-10 bg-linear-to-l from-[#e7eddf] via-[#f7f5ec] to-[#f7f5ec]' />
            <div className='absolute -top-24 -left-24 -z-10 size-72 rounded-full bg-[#a9bd8d]/30 blur-3xl' aria-hidden='true' />

            <div className='mx-auto flex max-w-[1280px] flex-col-reverse items-center gap-10 px-4 pt-12 pb-20 md:flex-row md:py-20 lg:px-8'>
                <div className='flex flex-1 flex-col items-start gap-5 text-right'>
                    <span className='rounded-full border border-primary/15 bg-white/70 px-4 py-1.5 text-sm font-medium text-primary'>
                        گل‌فروشی آنلاین گل‌نوش · گل تازه، هر روز
                    </span>

                    <h1 className='text-4xl font-bold leading-[1.35] text-[#243d2f] md:text-5xl lg:text-6xl'>
                        یک شاخه گل، یک دنیا حال خوب
                    </h1>

                    <p className='max-w-md text-muted-foreground'>
                        برای تولد، قرارهای عاشقانه یا یک روز معمولی؛ دسته‌گل دلخواهت را با گل‌های تازه و چیدمان دست‌ساز ما انتخاب کن.
                    </p>

                    <div className='flex flex-wrap items-center gap-3'>
                        <Link href='/products'>
                            <Button size='lg' className='rounded-full px-8 gap-2'>
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
                    </div>
                </div>

                <div className='flex flex-1 items-center justify-center'>
                    <div className='relative h-[330px] w-full max-w-[470px] overflow-hidden rounded-[48%_48%_24px_24px] shadow-2xl shadow-primary/15 ring-8 ring-white/70 md:h-[490px]'>
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
                        <div className='absolute bottom-5 right-5 rounded-2xl bg-white/90 px-4 py-3 shadow-lg backdrop-blur'>
                            <p className='text-sm font-bold text-foreground'>هدیه‌ای از دل طبیعت</p>
                            <p className='mt-1 text-xs text-muted-foreground'>با عشق، برای عزیزانت</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='absolute inset-x-0 bottom-4 flex flex-col items-center gap-1 text-muted-foreground'>
                <span className='text-xs'>اسکرول کنید</span>
                <ChevronDown className='size-4' aria-hidden='true' />
            </div>
        </section>
    );
};
