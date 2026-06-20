import { UserRole } from '@/providers/auth-context';

/**
 * ثابت‌های نقش‌ها و دسترسی‌ها
 */
export const ROLES = {
    ADMIN: 'ADMIN' as const,
    OPERATOR: 'OPERATOR' as const,
    USER: 'USER' as const,
} as const;

/**
 * تعریف دسترسی‌ها برای هر نقش
 */
export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
    ADMIN: [
        'manage_users',
        'manage_products',
        'manage_categories',
        'manage_coupons',
        'manage_orders',
        'manage_payments',
        'manage_reviews',
        'view_dashboard',
        'view_reports',
    ],
    OPERATOR: ['manage_products', 'manage_categories', 'manage_orders', 'view_dashboard', 'view_reports'],
    USER: ['view_products', 'create_order', 'view_my_orders', 'create_review'],
};

/**
 * بررسی اینکه آیا نقش دسترسی خاصی دارد یا نه
 */
export const hasPermission = (role: UserRole | null, permission: string): boolean => {
    if (!role) return false;
    return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
};

/**
 * بررسی اینکه آیا کاربر می‌تواند به مسیری دسترسی داشته باشد
 */
export const canAccessRoute = (role: UserRole | null, route: string): boolean => {
    if (!role) return false;

    // نقشه‌ی مسیرها به نقش‌های مورد نیاز
    const routeRoles: Record<string, UserRole[]> = {
        '/admin-dashboard': ['ADMIN', 'OPERATOR'],
        '/user-dashboard': ['USER', 'ADMIN'],
        '/auth/login': [],
        '/auth/register': [],
        '/products': [],
        '/cart': [],
    };

    const requiredRoles = routeRoles[route] || [];
    if (requiredRoles.length === 0) return true; // بدون محدودیت
    return requiredRoles.includes(role);
};

/**
 * دریافت نام نقش به فارسی
 */
export const getRoleLabel = (role: UserRole | null): string => {
    const labels: Record<UserRole, string> = {
        ADMIN: 'مدیر',
        OPERATOR: 'اپراتور',
        USER: 'کاربر',
    };
    return role ? labels[role] : 'نامشخص';
};
