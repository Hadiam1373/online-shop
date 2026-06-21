'use client';
import { HeaderTitle } from '@/components';
import styles from './admin-dashboard.module.css';
import { Typography } from '@/components/ui/typography';
import { useRouter } from 'next/navigation';
import { Package, FolderTree, Ticket, ShoppingBag, CreditCard, MessageSquareText, Users2, ArrowLeft } from 'lucide-react';

const QUICK_LINKS = [
    { href: '/admin-dashboard/products', label: 'مدیریت محصولات', icon: Package },
    { href: '/admin-dashboard/categories', label: 'دسته‌بندی‌ها', icon: FolderTree },
    { href: '/admin-dashboard/coupons', label: 'کدهای تخفیف', icon: Ticket },
    { href: '/admin-dashboard/orders', label: 'سفارشات', icon: ShoppingBag },
    { href: '/admin-dashboard/payments', label: 'پرداخت‌ها', icon: CreditCard },
    { href: '/admin-dashboard/reviews', label: 'نظرات', icon: MessageSquareText },
    { href: '/admin-dashboard/users', label: 'کاربران و گزارش‌ها', icon: Users2 },
];

export default function AdminPage() {
    const router = useRouter();
    return (
        <div className={styles['form_wrapper']}>
            <HeaderTitle title='پنل مدیریت' />
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                {QUICK_LINKS.map(link => {
                    const Icon = link.icon;
                    return (
                        <button
                            key={link.href}
                            onClick={() => router.push(link.href)}
                            className='group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 text-right transition-all hover:border-primary/30 hover:shadow-md'
                        >
                            <span className='flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent text-primary'>
                                <Icon className='size-5' />
                            </span>
                            <Typography variant='body1' weight='bold' className='flex-1 text-foreground'>
                                {link.label}
                            </Typography>
                            <ArrowLeft className='size-4 text-muted-foreground transition-transform group-hover:-translate-x-1 group-hover:text-primary' />
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
