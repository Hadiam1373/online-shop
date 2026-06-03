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
import { User2 } from 'lucide-react';
import style from './user-dashboard.module.css';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const path = usePathname();
    const route = useRouter();
    return (
        <SidebarProvider dir='rtl'>
            <Sidebar>
                <SidebarHeader>
                    <Typography variant='subtitle1' className='border-b border-secondary py-2 text-center'>
                        محصولات زیبایی نگار
                    </Typography>
                </SidebarHeader>
                <SidebarContent className={style['sidebar']}>
                    <div
                        onClick={() => route.push('/user-dashboard')}
                        className={cn(style['sidebar--item'], path === '/user-dashboard' && 'bg-accent')}
                    >
                        <Typography>مشخصات </Typography>
                    </div>
                    <div
                        onClick={() => route.push('/user-dashboard/orders')}
                        className={cn(style['sidebar--item'], path === '/user-dashboard/orders' && 'bg-accent')}
                    >
                        <Typography>سفارشات </Typography>
                    </div>
                    <div
                        onClick={() => route.push('/user-dashboard/comments')}
                        className={cn(style['sidebar--item'], path === '/user-dashboard/comments' && 'bg-accent')}
                    >
                        <Typography>نظر ها </Typography>
                    </div>
                    <div
                        onClick={() => route.push('/user-dashboard/whishlist')}
                        className={cn(style['sidebar--item'], path === '/user-dashboard/whishlist' && 'bg-accent')}
                    >
                        <Typography> علاقه مندی ها </Typography>
                    </div>
                    <div
                        onClick={() => route.push('/user-dashboard/security')}
                        className={cn(style['sidebar--item'], path === '/user-dashboard/security' && 'bg-accent')}
                    >
                        <Typography> امنیت حساب </Typography>
                    </div>
                </SidebarContent>
                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <User2 /> Username
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar>
            <main>
                <SidebarTrigger />
                {children}
            </main>
        </SidebarProvider>
    );
}
