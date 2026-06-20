'use client';
import { Button } from '@/components/ui/button';
import { Basket } from '@/components/ui/shared/header/components/desktop-header/components/basket.tsx/basket';
import { useAuth } from '@/providers/auth-context';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const MobileHeader: React.FC = () => {
    const { isLoading } = useAuth();
    return (
        <header className='w-full px-2 h-16 bg-primary-foreground  shadow flex items-center justify-between'>
            <Image width={100} src='/image/logo.png' alt='Logo' height='100' />
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
                {isLoading ? <Basket /> : null}
            </div>
        </header>
    );
};
