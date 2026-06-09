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
export const Profile: React.FC = () => {
    const navigate = useRouter();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <User className='cursor-pointer' />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <DropdownMenuLabel>حساب کاربری من</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => navigate.push('/user-dashboard')}>پروفایل</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate.push('/user-dashboard/whishlist')}>علاقه‌مندی‌ها</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate.push('/user-dashboard/orders')}>سفارشات</DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
