'use client';
import { HeaderTitle } from '@/components';
import { Button } from '@/components/ui/button';
import { DesktopTable } from '@/components/ui/table/desktop-table';
import { MobileCardTable } from '@/components/ui/table/mobile-table';
import styles from '../admin-dashboard.module.css';
import { useRouter } from 'next/navigation';
import { useGetAdminUsers, useChangeUserRole, useBanUser } from '@/lib/api/admin/admin.query';

export default function UsersPage() {
    const router = useRouter();
    const { data: users, isLoading, refetch } = useGetAdminUsers();
    const changeRoleMutation = useChangeUserRole();
    const banMutation = useBanUser();

    const changeRole = (userId: string, role: string) => {
        changeRoleMutation.mutate({ userId, payload: { role } }, { onSuccess: () => refetch() });
    };

    const banUser = (userId: string) => {
        banMutation.mutate({ userId, payload: { banned: true } }, { onSuccess: () => refetch() });
    };

    const items = users?.data ?? [];

    const rows = items.map(user => ({
        id: user.id,
        fields: [
            { label: 'ایمیل', value: user.email ?? 'بدون ایمیل' },
            { label: 'نقش', value: user.role },
            { label: 'سفارش‌ها', value: user._count.orders },
        ],
        actions: (
            <div className='flex flex-wrap gap-2 items-center'>
                <Button variant='outline' size='sm' onClick={() => changeRole(user.id, user.role === 'ADMIN' ? 'USER' : 'ADMIN')}>
                    تغییر نقش
                </Button>
                <Button variant='destructive' size='sm' onClick={() => banUser(user.id)}>
                    مسدود
                </Button>
                <Button variant='outline' size='sm' onClick={() => router.push(`/admin-dashboard/users/${user.id}`)}>
                    جزئیات
                </Button>
            </div>
        ),
    }));

    return (
        <div className={styles['form_wrapper']}>
            <HeaderTitle title='کاربران و گزارش‌ها' />

            <DesktopTable
                head={['ایمیل', 'نقش', 'سفارش‌ها', 'اقدامات']}
                isLoading={isLoading}
                isShowEmptyState={!items.length}
                body={
                    <tbody>
                        {items.map(u => (
                            <tr key={u.id} className='border-t'>
                                <td className='py-2'>{u.email ?? 'بدون ایمیل'}</td>
                                <td className='py-2'>{u.role}</td>
                                <td className='py-2'>{u._count.orders}</td>
                                <td className='py-2 flex flex-wrap gap-2'>
                                    <Button
                                        variant='outline'
                                        size='sm'
                                        onClick={() => changeRole(u.id, u.role === 'ADMIN' ? 'USER' : 'ADMIN')}
                                    >
                                        تغییر نقش
                                    </Button>
                                    <Button variant='destructive' size='sm' onClick={() => banUser(u.id)}>
                                        مسدود
                                    </Button>
                                    <Button variant='outline' size='sm' onClick={() => router.push(`/admin-dashboard/users/${u.id}`)}>
                                        جزئیات
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                }
            />

            <MobileCardTable data={rows} loading={isLoading} emptyText='کاربری موجود نیست' />
        </div>
    );
}
