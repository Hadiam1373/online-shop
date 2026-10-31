'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Flower2 } from 'lucide-react';
import { Basket } from './components/basket.tsx/basket';
import { Login } from '@/components/ui/shared/header/components/desktop-header/components/login';

const NAV_LINKS = [
    { href: '/', label: 'صفحه اصلی' },
    { href: '/products', label: 'گل‌ها و هدیه‌ها' },
];

export const DesktopHeader: React.FC = () => {
    const pathname = usePathname();

    return (
        <header className='w-full h-20 bg-background/80 backdrop-blur-md border-b border-border grid grid-cols-2 items-center px-6 lg:px-12 supports-backdrop-blur:bg-background/60'>
            <div className='flex items-center gap-10'>
                <Link href='/' className='flex items-center gap-2 text-primary'>
                    <span className='flex size-11 items-center justify-center rounded-2xl bg-accent'>
                        <Flower2 className='size-6' />
                    </span>
                    <span className='flex flex-col leading-tight'>
                        <strong className='text-lg font-black'>گل‌نوش</strong>
                        <small className='text-[10px] text-muted-foreground'>تازه از طبیعت</small>
                    </span>
                </Link>
                <nav className='hidden md:flex items-center gap-1'>
                    {NAV_LINKS.map(link => {
                        const isActive = pathname === link.href;
                        return (
                            <Link key={link.href} href={link.href}>
                                <Button
                                    variant='ghost'
                                    size='sm'
                                    className={cn(
                                        'rounded-full px-4 text-muted-foreground',
                                        isActive && 'bg-accent text-primary font-semibold',
                                    )}
                                >
                                    {link.label}
                                </Button>
                            </Link>
                        );
                    })}
                </nav>
            </div>
            <div className='flex items-center justify-end gap-3'>
                <Basket />
                <Login />
            </div>
        </header>
    );
};
