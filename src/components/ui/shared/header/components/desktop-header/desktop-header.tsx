'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Flower2 } from 'lucide-react';
import { Basket } from './components/basket.tsx/basket';
import { Login } from '@/components/ui/shared/header/components/desktop-header/components/login';
import { useGetCategories } from '@/lib/api/categories/categories.query';
import { useActiveCategory } from '../use-active-category';

const NAV_LINKS = [
    { href: '/', label: 'صفحه اصلی' },
    { href: '/articles', label: 'مقالات گل و گیاه' },
    { href: '/products', label: 'گل‌ها و هدیه‌ها' },
];

export const DesktopHeader: React.FC = () => {
    const pathname = usePathname();
    const { data: categories } = useGetCategories();
    const { activeCategoryId, setActiveCategoryId } = useActiveCategory();

    return (
        <header className='w-full border-b border-border bg-background/80 backdrop-blur-md supports-backdrop-blur:bg-background/60'>
            <div className='flex h-20 items-center gap-4 px-4 lg:gap-6 lg:px-8'>
                <Link href='/' className='flex shrink-0 items-center gap-2 text-primary'>
                    <span className='flex size-11 items-center justify-center rounded-2xl bg-accent'>
                        <Flower2 className='size-6' />
                    </span>
                    <span className='flex flex-col leading-tight'>
                        <strong className='text-lg font-black'>گل‌نوش</strong>
                        <small className='text-[10px] text-muted-foreground'>تازه از طبیعت</small>
                    </span>
                </Link>
                <nav
                    aria-label='دسته‌بندی محصولات و صفحات اصلی'
                    className='hidden min-w-0 flex-1 items-center gap-1 overflow-x-auto md:flex [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
                >
                    {NAV_LINKS.map(link => {
                        const isActive = pathname === link.href && (link.href !== '/products' || !activeCategoryId);
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className='shrink-0'
                                onClick={() => link.href === '/products' && setActiveCategoryId('')}
                            >
                                <Button
                                    variant='ghost'
                                    size='sm'
                                    className={cn(
                                        'whitespace-nowrap rounded-full px-3 text-muted-foreground',
                                        isActive && 'bg-accent text-primary font-semibold',
                                    )}
                                >
                                    {link.label}
                                </Button>
                            </Link>
                        );
                    })}
                    {categories?.data?.map(category => (
                        <Link
                            key={category.id}
                            href={`/products?categoryId=${encodeURIComponent(category.id)}`}
                            aria-current={activeCategoryId === category.id ? 'page' : undefined}
                            onClick={() => setActiveCategoryId(category.id)}
                            className={cn(
                                'shrink-0 whitespace-nowrap rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-primary',
                                activeCategoryId === category.id && 'bg-accent font-semibold text-primary',
                            )}
                        >
                            {category.name}
                        </Link>
                    ))}
                </nav>
                <div className='flex shrink-0 items-center justify-end gap-3'>
                    <Basket />
                    <Login />
                </div>
            </div>
        </header>
    );
};
