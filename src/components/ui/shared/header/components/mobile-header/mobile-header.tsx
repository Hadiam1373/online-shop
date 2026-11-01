'use client';
import { Home, LayoutGrid, MenuIcon, ShoppingCart, UserRound, Flower2, Leaf } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { useGetCart } from '@/lib/api/cart/cart.query';
import { useGetCategories } from '@/lib/api/categories/categories.query';
import { cn } from '@/lib/utils';
import { Login } from '@/components/ui/shared/header/components/desktop-header/components/login';
import { useActiveCategory } from '../use-active-category';

const NAV_LINKS = [
    { href: '/', label: 'صفحه اصلی', icon: Home },
    { href: '/articles', label: 'مقالات گل و گیاه', icon: Leaf },
    { href: '/products', label: 'گل‌ها و هدیه‌ها', icon: LayoutGrid },
    { href: '/cart', label: 'سبد خرید', icon: ShoppingCart },
    { href: '/user-dashboard', label: 'حساب کاربری', icon: UserRound },
];

export const MobileHeader: React.FC = () => {
    const { data } = useGetCart();
    const { data: categories } = useGetCategories();
    const pathname = usePathname();
    const { activeCategoryId, setActiveCategoryId } = useActiveCategory();

    return (
        <header className='w-full border-b border-border bg-background/90 backdrop-blur-md'>
            <div className='flex h-16 items-center justify-between px-4'>
                <Link href='/' className='flex items-center gap-2 text-primary'>
                    <span className='flex size-9 items-center justify-center rounded-xl bg-accent'>
                        <Flower2 className='size-5' />
                    </span>
                    <span className='text-lg font-black'>گل‌نوش</span>
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
                                <SheetDescription>گل‌فروشی آنلاین گل‌نوش</SheetDescription>
                            </SheetHeader>

                            <nav className='mt-2 flex flex-1 flex-col gap-1 overflow-y-auto px-4'>
                                {NAV_LINKS.map(link => {
                                    const isActive = pathname === link.href && (link.href !== '/products' || !activeCategoryId);
                                    const Icon = link.icon;
                                    return (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className='w-full'
                                            onClick={() => link.href === '/products' && setActiveCategoryId('')}
                                        >
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
                                                    <span className='mr-auto text-xs text-primary'>
                                                        {data.itemCount.toLocaleString('fa')}
                                                    </span>
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
            </div>
            {!!categories?.data?.length && (
                <nav
                    aria-label='دسته‌بندی محصولات'
                    className='flex items-center gap-1 overflow-x-auto border-t border-border/70 px-3 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
                >
                    {categories.data.map(category => (
                        <Link
                            key={category.id}
                            href={`/products?categoryId=${encodeURIComponent(category.id)}`}
                            aria-current={activeCategoryId === category.id ? 'page' : undefined}
                            onClick={() => setActiveCategoryId(category.id)}
                            className={cn(
                                'shrink-0 rounded-full px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-primary',
                                activeCategoryId === category.id && 'bg-accent font-semibold text-primary',
                            )}
                        >
                            {category.name}
                        </Link>
                    ))}
                </nav>
            )}
        </header>
    );
};
