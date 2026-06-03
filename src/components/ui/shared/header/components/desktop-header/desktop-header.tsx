import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { Login } from '../login';
import { cookieWrapper } from '@/lib/cookie';

export const DesktopHeader: React.FC = () => {
    return (
        <header className='w-full h-24 bg-background grid grid-cols-2 items-center px-12 shadow'>
            <div>
                <img width={100} src='/image/logo.png' alt='Logo' className='h-auto' />
            </div>
            <div className='flex items-center justify-end gap-4'>
                <Link href='/'>
                    <Button variant='link' size='sm'>
                        Home
                    </Button>
                </Link>
                <Link href='/products'>
                    <Button variant='link' size='sm'>
                        Products
                    </Button>
                </Link>
                <ShoppingCart />
                <Login />
            </div>
        </header>
    );
};
