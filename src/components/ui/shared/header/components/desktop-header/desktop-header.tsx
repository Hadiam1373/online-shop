import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Basket } from './components/basket.tsx/basket';
import { Profile } from '@/components/ui/shared/header/components/desktop-header/components/profile';

export const DesktopHeader: React.FC = () => {
    return (
        <header className='w-full h-22 bg-background grid grid-cols-2 items-center px-12 shadow'>
            <div>
                <Image width={100} src='/image/logo.png' alt='Logo' height='100' />
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
                <Profile />
            </div>
        </header>
    );
};
