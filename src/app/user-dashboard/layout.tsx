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
import { User2, UserRound, ShoppingBag, MessageSquareText, Heart, ShieldCheck } from 'lucide-react';
import style from './user-dashboard.module.css';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import Header from '@/components/ui/shared/header/header';

const NAV_ITEMS = [
    { href: '/user-dashboard', label: 'مشخصات', icon: UserRound, exact: true },
    { href: '/user-dashboard/orders', label: 'سفارشات', icon: ShoppingBag },
    { href: '/user-dashboard/comments', label: 'نظرها', icon: MessageSquareText },
    { href: '/user-dashboard/whishlist', label: 'علاقه‌مندی‌ها', icon: Heart },
    { href: '/user-dashboard/security', label: 'امنیت حساب', icon: ShieldCheck },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const path = usePathname();
    const route = useRouter();

    const isActive = (href: string, exact?: boolean) => (exact ? path === href : path?.startsWith(href));

    return (
        <div>
            <Header />
            <SidebarProvider dir='rtl'>
                <Sidebar>
                    <SidebarHeader>
                        <div className='flex items-center gap-2 border-b border-sidebar-border py-4 px-2'>
                            <span className='flex size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                                <User2 className='size-4' />
                            </span>
                            <Typography variant='subtitle2' weight='bold' className='text-sidebar-foreground'>
                                پروفایل کاربر
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
                                    onClick={() => route.push(item.href)}
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
                                <SidebarMenuButton className='text-sidebar-foreground'>
                                    <User2 /> Username
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarFooter>
                </Sidebar>
                <main className='w-full'>
                    <SidebarTrigger className='m-2' />
                    {children}
                </main>
            </SidebarProvider>
        </div>
    );
}
