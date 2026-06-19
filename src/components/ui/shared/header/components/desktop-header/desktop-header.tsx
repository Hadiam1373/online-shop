import { Button } from '@/components/ui/button';
import { Basket } from './components/basket.tsx/basket';
import Link from 'next/link';
import React from 'react';
import { Login } from './components/login';

export const DesktopHeader: React.FC = () => {
    return (
        <header className='w-full h-28 bg-background grid grid-cols-2 items-center px-12 shadow'>
            <div>
                <img width={150} src='/image/logo.png' alt='Logo' className='h-auto' />
            </div>
            <div className='flex items-center justify-end gap-4'>
                <Link href='/'>
                    <Button variant='link' size='sm' className='text-destructive'>
                        صفحه اصلی
                    </Button>
                </Link>
                <Link href='/products'>
                    <Button variant='link' size='sm' className='text-destructive'>
                        محصولات
                    </Button>
                </Link>
                <Basket />
                <Login />
            </div>
        </header>
    );
};
