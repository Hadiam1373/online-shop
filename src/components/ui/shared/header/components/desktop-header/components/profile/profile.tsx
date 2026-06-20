'use client';
import { User } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/auth-context';
import { useLogout } from '@/hooks/usePermission';

export const Profile: React.FC = () => {
    const navigate = useRouter();
    const { isAuthenticated, role } = useAuth();
    const { logout } = useLogout();

    if (!isAuthenticated) return null;
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <User className='cursor-pointer' />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuLabel>حساب کاربری من</DropdownMenuLabel>
                    {role === 'USER' && (
                        <>
                            <DropdownMenuItem onClick={() => navigate.push('/user-dashboard')}>پروفایل</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate.push('/user-dashboard/whishlist')}>علاقه‌مندی‌ها</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate.push('/user-dashboard/orders')}>سفارشات</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => logout()}>خروج</DropdownMenuItem>
                        </>
                    )}

                    {(role === 'ADMIN' || role === 'OPERATOR') && (
                        <>
                            <DropdownMenuItem onClick={() => navigate.push('/admin-dashboard')}>پنل مدیریت</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => logout()}>خروج</DropdownMenuItem>
                        </>
                    )}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
