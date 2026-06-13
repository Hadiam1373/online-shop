'use client';
import { Button } from '@/components/ui/button';
import { Login } from '@/components/ui/shared/header/components/desktop-header/components/login';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

export const MobileHeader: React.FC = () => {
    const path = usePathname();
    const route = useRouter();
    return (
        <header className='w-full px-2 h-16 bg-primary-foreground  shadow flex items-center justify-between'>
            <img width={80} src='/image/logo.png' alt='Logo' className='h-auto' />
            <div className='flex items-center justify-end gap-1'>
                <Link href='/'>
                    <Button variant='link' size='xs' className='text-destructive'>
                        صفحه اصلی
                    </Button>
                </Link>
                <Link href='/products'>
                    <Button variant='link' size='xs' className='text-destructive'>
                        محصولات
                    </Button>
                </Link>
                <ShoppingCart />
                <Login />
            </div>
        </header>
    );
};
