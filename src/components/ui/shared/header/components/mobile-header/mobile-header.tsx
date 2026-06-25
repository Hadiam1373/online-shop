'use client';
import { Home, LayoutGrid, MenuIcon, ShoppingCart, UserRound } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { useGetCart } from '@/lib/api/cart/cart.query';
import { cn } from '@/lib/utils';
import { Login } from '@/components/ui/shared/header/components/desktop-header/components/login';

const NAV_LINKS = [
    { href: '/', label: 'صفحه اصلی', icon: Home },
    { href: '/products', label: 'محصولات', icon: LayoutGrid },
    { href: '/cart', label: 'سبد خرید', icon: ShoppingCart },
    { href: '/user-dashboard', label: 'حساب کاربری', icon: UserRound },
];

export const MobileHeader: React.FC = () => {
    const { data } = useGetCart();
    const pathname = usePathname();

    return (
        <header className='w-full px-4 h-16 bg-background/90 backdrop-blur-md border-b border-border flex items-center justify-between'>
            <Link href='/'>
                <Image loading='eager' width={80} src='/image/logo.webp' alt='Logo' height={80} className=' object-contain' />
            </Link>

            <div className='flex items-center gap-1'>
                <Link href='/cart' className='relative rounded-full p-2 text-foreground hover:bg-accent hover:text-primary'>
                    <ShoppingCart className='size-5' />
                    {data?.itemCount ? (
                        <span className='absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold size-4 rounded-full flex items-center justify-center'>
                            {data.itemCount.toLocaleString('fa')}
                        </span>
                    ) : null}
                </Link>

                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant='ghost' size='icon' className='rounded-full'>
                            <MenuIcon className='size-6' />
                            <span className='sr-only'>باز کردن منو</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side='right' className='flex flex-col'>
                        <SheetHeader>
                            <SheetTitle>منو</SheetTitle>
                            <SheetDescription>موتوپارت</SheetDescription>
                        </SheetHeader>

                        <nav className='mt-2 flex flex-col gap-1 px-4'>
                            {NAV_LINKS.map(link => {
                                const isActive = pathname === link.href;
                                const Icon = link.icon;
                                return (
                                    <Link key={link.href} href={link.href} className='w-full'>
                                        <Button
                                            variant='ghost'
                                            className={cn(
                                                'justify-start w-full gap-3 text-muted-foreground',
                                                isActive && 'bg-accent text-primary font-semibold',
                                            )}
                                        >
                                            <Icon className='size-4' />
                                            {link.label}
                                            {link.href === '/cart' && data?.itemCount ? (
                                                <span className='mr-auto text-xs text-primary'>{data.itemCount.toLocaleString('fa')}</span>
                                            ) : null}
                                        </Button>
                                    </Link>
                                );
                            })}
                        </nav>

                        <SheetFooter>
                            <Login />
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
};
