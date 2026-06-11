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
        <header className='w-full px-2 h-16 bg-primary-foreground  shadow flex items-center justify-between'>
            <img width={80} src='/image/logo.png' alt='Logo' className='h-auto' />
        </header>
    );
};
