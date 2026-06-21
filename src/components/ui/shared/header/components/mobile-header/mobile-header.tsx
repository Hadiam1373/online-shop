'use client';
import { MenuIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { useGetCart } from '@/lib/api/cart/cart.query';

export const MobileHeader: React.FC = () => {
    const { data } = useGetCart();
    return (
        <header className='w-full px-4 h-16 bg-primary-foreground shadow flex items-center justify-between'>
            <Image width={60} src='/image/logo.png' alt='Logo' height='100' />

            <Sheet>
                <SheetTrigger asChild>
                    <Button variant='ghost' className='rounded-full p-2 transition hover:bg-slate-900/10'>
                        <MenuIcon className='size-6' />
                        <span className='sr-only'>باز کردن منو</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side='right'>
                    <SheetHeader>
                        <SheetTitle>منو</SheetTitle>
                        <SheetDescription className='mt-8'>کویر یدک</SheetDescription>
                    </SheetHeader>

                    <nav className='mt-6 flex flex-col gap-2'>
                        <Link href='/' className='w-full'>
                            <Button variant='ghost' className='justify-start w-full'>
                                صفحه اصلی
                            </Button>
                        </Link>
                        <Link href='/products' className='w-full'>
                            <Button variant='ghost' className='justify-start w-full'>
                                محصولات
                            </Button>
                        </Link>
                        <Link href='/cart' className='w-full'>
                            <Button variant='ghost' className='justify-start w-full'>
                                سبد خرید {data?.itemCount && data?.itemCount > 0 ? `(${data?.itemCount.toLocaleString('fa')} مورد)` : ''}
                            </Button>
                        </Link>
                        <Link href='/user-dashboard' className='w-full'>
                            <Button variant='ghost' className='justify-start w-full'>
                                حساب کاربری
                            </Button>
                        </Link>
                    </nav>
                    <Button className='w-48 mx-auto mt-10' variant='outline'></Button>
                </SheetContent>
            </Sheet>
        </header>
    );
};
