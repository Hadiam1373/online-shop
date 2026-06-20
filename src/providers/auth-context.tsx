'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { IUserProfileResponse } from '@/lib/api/users/users.dto';
import { useGetProfile } from '@/lib/api/users/users.query';
import { cookieWrapper } from '@/lib/cookie';
import { useRouter } from 'next/navigation';

export type UserRole = 'USER' | 'ADMIN' | 'OPERATOR';

interface AuthContextType {
    user: IUserProfileResponse | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    role: UserRole | null;
    // دسترسی‌ها
    canAccessAdminDashboard: boolean;
    canAccessUserDashboard: boolean;
    hasRole: (roles: UserRole | UserRole[]) => boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [hasToken, setHasToken] = useState(false);
    const navigate = useRouter();

    // بررسی توکن در هنگام mount
    useEffect(() => {
        const accessToken = cookieWrapper.get('accessToken');
        const tokenExists = !!accessToken;
        setHasToken(tokenExists);
        setIsAuthenticated(tokenExists);
    }, []);

    // گوش دادن به تغییرات احراز هویت که توسط لاگین/لاگ‌آوت منتشر می‌شود
    useEffect(() => {
        const handler = () => {
            const accessToken = cookieWrapper.get('accessToken');
            const tokenExists = !!accessToken;
            setHasToken(tokenExists);
            setIsAuthenticated(tokenExists);
        };

        try {
            window.addEventListener('authChange', handler);
        } catch (e) {
            // محیط بدون window
        }

        return () => {
            try {
                window.removeEventListener('authChange', handler);
            } catch (e) {
                // ignore
            }
        };
    }, []);

    // فقط اگر توکن وجود داشت، profile را دریافت کن
    const { data: profile, isLoading: profileLoading } = useGetProfile({
        queryOptions: {
            enabled: hasToken, // فقط اگر توکن وجود داشت
            retry: 1, // تنها 1 بار retry کن
        },
    });

    const user = profile || null;
    const role = (user?.role as UserRole) || null;

    // دسترسی‌ها بر اساس نقش
    const canAccessAdminDashboard = role === 'ADMIN' || role === 'OPERATOR';
    // allow only plain USER role to access user dashboard
    const canAccessUserDashboard = role === 'USER';

    const hasRole = (roles: UserRole | UserRole[]): boolean => {
        if (!role) return false;
        const roleArray = Array.isArray(roles) ? roles : [roles];
        return roleArray.includes(role);
    };

    const logout = () => {
        cookieWrapper.delete('accessToken');
        cookieWrapper.delete('refreshToken');
        setIsAuthenticated(false);
        setHasToken(false);
        navigate.push('/auth/login');
        try {
            window.dispatchEvent(new Event('authChange'));
        } catch (e) {
            // ignore
        }
    };

    const value: AuthContextType = {
        user,
        isLoading: profileLoading,
        isAuthenticated,
        role,
        canAccessAdminDashboard,
        canAccessUserDashboard,
        hasRole,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth باید درون AuthProvider استفاده شود');
    }
    return context;
};

/**
 * Hook برای بررسی دسترسی کاربر
 * مثال: const { canAccess } = useAuthGuard(['ADMIN']); // فقط ADMIN‌ها
 */
export const useAuthGuard = (allowedRoles?: UserRole[]) => {
    const { isAuthenticated, role } = useAuth();

    const canAccess = isAuthenticated && (!allowedRoles || !allowedRoles.length || (role && allowedRoles.includes(role)));

    return {
        canAccess,
        isAuthenticated,
        role,
    };
};
