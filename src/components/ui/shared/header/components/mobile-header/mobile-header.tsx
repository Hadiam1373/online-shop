'use client';
import { Sidebar, SidebarContent, SidebarHeader, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Typography } from '@/components/ui/typography';
import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

export const MobileHeader: React.FC = () => {
    const path = usePathname();
    const route = useRouter();
    return (
        <SidebarProvider dir='rtl'>
            <header className='w-full px-2 h-16 bg-primary-foreground  shadow flex items-center justify-between'>
                <img width={80} src='/image/logo.png' alt='Logo' className='h-auto' />
                <SidebarTrigger />
                <Sidebar className='flex flex-col gap-5'>
                    <SidebarHeader></SidebarHeader>
                    <SidebarContent>
                        <div
                            onClick={() => route.push('/user-dashboard')}
                            className={cn(
                                'p-2 mx-2 rounded-lg cursor-pointer text-background',
                                path === '/user-dashboard' && 'bg-destructive',
                            )}
                        >
                            <Typography>خانه </Typography>
                        </div>
                    </SidebarContent>
                </Sidebar>
            </header>
        </SidebarProvider>
    );
};
