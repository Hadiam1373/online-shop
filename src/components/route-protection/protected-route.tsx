'use client';

import React, { useEffect, useState } from 'react';
import { useAuthGuard, UserRole } from '@/providers/auth-context';
import { cookieWrapper } from '@/lib/cookie';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

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
    const { canAccess, isAuthenticated } = useAuthGuard(allowedRoles);
    const router = useRouter();
    const [redirecting, setRedirecting] = useState(false);

    if (isLoading) {
        return fallback || <Skeleton className='w-full h-screen' />;
    }

    // Do not trigger navigation during render — use effect instead
    useEffect(() => {
        if (isLoading) return;

        const hasCookie = !!cookieWrapper.get('accessToken');

        // only redirect to login if there's no access token cookie
        if (!isAuthenticated && !hasCookie) {
            setRedirecting(true);
            router.push('/auth/login');
        } else {
            setRedirecting(false);
        }
    }, [isLoading, isAuthenticated, router]);

    if (redirecting) {
        return fallback || <Skeleton className='w-full h-screen' />;
    }

    if (!canAccess) {
        // دسترسی رد شد
        return (
            <div className='flex items-center justify-center min-h-screen'>
                <div className='text-center'>
                    <h1 className='text-2xl font-bold'>دسترسی رد شد</h1>
                    <p className='text-gray-600 mt-2'>شما دسترسی کافی برای دیدن این صفحه ندارید</p>
                    <button onClick={() => router.back()} className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'>
                        بازگشت
                    </button>
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
