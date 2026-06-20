'use client';

import { useAuth } from '@/providers/auth-context';
import { canAccessRoute, hasPermission, ROLE_PERMISSIONS } from '@/lib/authorization';

/**
 * Hook برای بررسی دسترسی کاربر
 * استفاده: const { canAccess, role } = usePermission('manage_products');
 */
export const usePermission = (permission: string) => {
    const { role, isAuthenticated } = useAuth();

    const canAccess = isAuthenticated && hasPermission(role, permission);

    return {
        canAccess,
        role,
        isAuthenticated,
    };
};

/**
 * Hook برای بررسی دسترسی به مسیر
 * استفاده: const { canAccess } = useCanAccessRoute('/admin-dashboard');
 */
export const useCanAccessRoute = (route: string) => {
    const { role, isAuthenticated } = useAuth();

    const canAccess = isAuthenticated && canAccessRoute(role, route);

    return {
        canAccess,
        role,
        isAuthenticated,
        route,
    };
};

/**
 * Hook برای دریافت تمام دسترسی‌های کاربر
 */
export const useUserPermissions = () => {
    const { role } = useAuth();

    const permissions = role ? ROLE_PERMISSIONS[role] : [];

    return {
        permissions,
        role,
    };
};

/**
 * Hook برای لاگ‌آوت
 */
export const useLogout = () => {
    const { logout } = useAuth();

    return { logout };
};
