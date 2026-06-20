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

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const path = usePathname();
    const router = useRouter();
    const { isLoading } = useAuth();

    return (
        <AdminRoute isLoading={isLoading}>
            <Header />
            <SidebarProvider dir='rtl'>
                <Sidebar>
                    <SidebarHeader>
                        <Typography variant='subtitle1' className='border-b border-secondary py-3 text-center text-background'>
                            پنل مدیریت
                        </Typography>
                    </SidebarHeader>
                    <SidebarContent className={style['sidebar']}>
                        <div
                            onClick={() => router.push('/admin-dashboard')}
                            className={cn(style['sidebar--item'], path === '/admin-dashboard' && 'bg-destructive')}
                        >
                            <Typography>داشبورد</Typography>
                        </div>
                        <div
                            onClick={() => router.push('/admin-dashboard/products')}
                            className={cn(style['sidebar--item'], path?.startsWith('/admin-dashboard/products') && 'bg-destructive')}
                        >
                            <Typography>مدیریت محصولات</Typography>
                        </div>
                        <div
                            onClick={() => router.push('/admin-dashboard/categories')}
                            className={cn(style['sidebar--item'], path?.startsWith('/admin-dashboard/categories') && 'bg-destructive')}
                        >
                            <Typography>دسته‌بندی‌ها</Typography>
                        </div>
                        <div
                            onClick={() => router.push('/admin-dashboard/coupons')}
                            className={cn(style['sidebar--item'], path?.startsWith('/admin-dashboard/coupons') && 'bg-destructive')}
                        >
                            <Typography>کدهای تخفیف</Typography>
                        </div>
                        <div
                            onClick={() => router.push('/admin-dashboard/orders')}
                            className={cn(style['sidebar--item'], path?.startsWith('/admin-dashboard/orders') && 'bg-destructive')}
                        >
                            <Typography>سفارشات</Typography>
                        </div>
                        <div
                            onClick={() => router.push('/admin-dashboard/payments')}
                            className={cn(style['sidebar--item'], path?.startsWith('/admin-dashboard/payments') && 'bg-destructive')}
                        >
                            <Typography>پرداخت‌ها</Typography>
                        </div>
                        <div
                            onClick={() => router.push('/admin-dashboard/reviews')}
                            className={cn(style['sidebar--item'], path?.startsWith('/admin-dashboard/reviews') && 'bg-destructive')}
                        >
                            <Typography>نظرات</Typography>
                        </div>
                        <div
                            onClick={() => router.push('/admin-dashboard/users')}
                            className={cn(style['sidebar--item'], path?.startsWith('/admin-dashboard/users') && 'bg-destructive')}
                        >
                            <Typography>کاربران و گزارش‌ها</Typography>
                        </div>
                    </SidebarContent>
                    <SidebarFooter>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton>مدیریت</SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarFooter>
                </Sidebar>
                <main className='w-full'>
                    <SidebarTrigger />
                    {children}
                </main>
            </SidebarProvider>
        </AdminRoute>
    );
}
