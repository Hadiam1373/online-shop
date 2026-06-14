'use client';
import React from 'react';
import { HeaderTitle } from '@/components';
import styles from '../admin-dashboard.module.css';
import { useGetAdminUsers, useChangeUserRole, useBanUser } from '@/lib/api/admin/admin.query';
import { useRouter } from 'next/navigation';

export default function UsersPage() {
    const router = useRouter();
    const { data: users, isLoading, refetch } = useGetAdminUsers();
    const changeRoleMutation = useChangeUserRole();
    const banMutation = useBanUser();

    const changeRole = (userId: string, role: string) => {
        changeRoleMutation.mutate({ userId, role }, { onSuccess: () => refetch() });
    };

    const banUser = (userId: string) => {
        banMutation.mutate(userId, { onSuccess: () => refetch() });
    };

    return (
        <div className={styles['form_wrapper']}>
            <HeaderTitle title='کاربران و گزارش‌ها' />
            {isLoading && <p>در حال بارگذاری...</p>}
            {!isLoading && users && (
                <table className='w-full text-right mt-4'>
                    <thead>
                        <tr className='text-sm text-muted-foreground'>
                            <th>ایمیل</th>
                            <th>نقش</th>
                            <th>اقدامات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u: any) => (
                            <tr key={u.id} className='border-t'>
                                <td className='py-2'>{u.email}</td>
                                <td className='py-2'>{u.role}</td>
                                <td className='py-2'>
                                    <button className='btn' onClick={() => changeRole(u.id, u.role === 'ADMIN' ? 'USER' : 'ADMIN')}>
                                        تغییر نقش
                                    </button>
                                    <button className='btn ml-2' onClick={() => banUser(u.id)}>
                                        مسدود/آن‌بلاک
                                    </button>
                                    <button className='btn ml-2' onClick={() => router.push(`/admin-dashboard/users/${u.id}`)}>
                                        جزئیات
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
