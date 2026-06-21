'use client';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import { Typography } from '@/components/ui/typography';
import { usePathname, useRouter } from 'next/navigation';
import style from './admin-dashboard.module.css';
import { cn } from '@/lib/utils';
import { useAuth } from '@/providers/auth-context';
import { AdminRoute } from '@/components/route-protection/protected-route';
import Header from '@/components/ui/shared/header/header';
import {
    LayoutDashboard,
    Package,
    FolderTree,
    Ticket,
    ShoppingBag,
    CreditCard,
    MessageSquareText,
    Users2,
    ShieldCheck,
} from 'lucide-react';

const NAV_ITEMS = [
    { href: '/admin-dashboard', label: 'داشبورد', icon: LayoutDashboard, exact: true },
    { href: '/admin-dashboard/products', label: 'مدیریت محصولات', icon: Package },
    { href: '/admin-dashboard/categories', label: 'دسته‌بندی‌ها', icon: FolderTree },
    { href: '/admin-dashboard/coupons', label: 'کدهای تخفیف', icon: Ticket },
    { href: '/admin-dashboard/orders', label: 'سفارشات', icon: ShoppingBag },
    { href: '/admin-dashboard/payments', label: 'پرداخت‌ها', icon: CreditCard },
    { href: '/admin-dashboard/reviews', label: 'نظرات', icon: MessageSquareText },
    { href: '/admin-dashboard/users', label: 'کاربران و گزارش‌ها', icon: Users2 },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const path = usePathname();
    const router = useRouter();
    const { isLoading } = useAuth();

    const isActive = (href: string, exact?: boolean) => (exact ? path === href : path?.startsWith(href));

    return (
        <AdminRoute isLoading={isLoading}>
            <Header />
            <SidebarProvider dir='rtl'>
                <Sidebar>
                    <SidebarHeader>
                        <div className='flex items-center gap-2 border-b border-sidebar-border py-4 px-2'>
                            <span className='flex size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                                <ShieldCheck className='size-4' />
                            </span>
                            <Typography variant='subtitle2' weight='bold' className='text-sidebar-foreground'>
                                پنل مدیریت
                            </Typography>
                        </div>
                    </SidebarHeader>
                    <SidebarContent className={style['sidebar']}>
                        {NAV_ITEMS.map(item => {
                            const Icon = item.icon;
                            const active = isActive(item.href, item.exact);
                            return (
                                <div
                                    key={item.href}
                                    onClick={() => router.push(item.href)}
                                    className={cn(style['sidebar--item'], active && style['sidebar--item-active'])}
                                >
                                    <Icon className='size-4 shrink-0' />
                                    <Typography variant='body2' weight={active ? 'bold' : 'regular'}>
                                        {item.label}
                                    </Typography>
                                </div>
                            );
                        })}
                    </SidebarContent>
                    <SidebarFooter>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton className='text-sidebar-foreground'>مدیریت</SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarFooter>
                </Sidebar>
                <main className='w-full'>
                    <SidebarTrigger className='m-2' />
                    {children}
                </main>
            </SidebarProvider>
        </AdminRoute>
    );
}
