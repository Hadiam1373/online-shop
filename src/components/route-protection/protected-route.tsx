'use client';

import React, { useEffect, useState } from 'react';
import { useAuthGuard, UserRole } from '@/providers/auth-context';
import { cookieWrapper } from '@/lib/cookie';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { ShieldAlert } from 'lucide-react';

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: UserRole[];
    fallback?: React.ReactNode;
    isLoading?: boolean;
}

/**
 * کامپوننت برای محافظت از مسیرهایی که نیاز به ورود دارند
 * مثال: <ProtectedRoute allowedRoles={['ADMIN']}>محتوا</ProtectedRoute>
 */
export const ProtectedRoute = ({ children, allowedRoles, fallback, isLoading }: ProtectedRouteProps) => {
    const { canAccess, isAuthenticated, isInitialized } = useAuthGuard(allowedRoles);
    const router = useRouter();
    const [redirecting, setRedirecting] = useState(false);

    // Do not trigger navigation during render — use effect instead
    useEffect(() => {
        if (!isInitialized || isLoading) return;

        const hasCookie = !!cookieWrapper.get('accessToken');

        // only redirect to login if there's no access token cookie
        if (!isAuthenticated && !hasCookie) {
            setRedirecting(true);
            router.push('/auth/login');
        } else {
            setRedirecting(false);
        }
    }, [isInitialized, isLoading, isAuthenticated, router]);

    if (!isInitialized || isLoading) {
        return fallback || <Skeleton className='w-full h-screen' />;
    }

    if (redirecting) {
        return fallback || <Skeleton className='w-full h-screen' />;
    }

    if (!canAccess) {
        // دسترسی رد شد
        return (
            <div className='flex items-center justify-center min-h-screen px-4'>
                <div className='flex flex-col items-center gap-3 text-center'>
                    <span className='flex size-14 items-center justify-center rounded-full bg-destructive/10 text-destructive'>
                        <ShieldAlert className='size-7' />
                    </span>
                    <Typography variant='subtitle1' weight='bold' className='text-foreground'>
                        دسترسی رد شد
                    </Typography>
                    <Typography variant='body2' className='text-muted-foreground'>
                        شما دسترسی کافی برای دیدن این صفحه ندارید
                    </Typography>
                    <Button onClick={() => router.back()} className='mt-2'>
                        بازگشت
                    </Button>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};

/**
 * Wrapper برای layout‌های ادمین
 */
interface AdminRouteProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
    isLoading?: boolean;
}

export const AdminRoute = ({ children, fallback, isLoading }: AdminRouteProps) => {
    return (
        <ProtectedRoute allowedRoles={['ADMIN', 'OPERATOR']} fallback={fallback} isLoading={isLoading}>
            {children}
        </ProtectedRoute>
    );
};

interface UserRouteProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
    isLoading?: boolean;
}

/**
 * Wrapper برای layout‌های کاربر
 */
export const UserRoute = ({ children, fallback, isLoading }: UserRouteProps) => {
    return (
        <ProtectedRoute allowedRoles={['USER']} fallback={fallback} isLoading={isLoading}>
            {children}
        </ProtectedRoute>
    );
};
