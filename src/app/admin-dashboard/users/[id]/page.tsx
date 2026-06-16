'use client';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { HeaderTitle } from '@/components';
import styles from '../../admin-dashboard.module.css';
import { useGetAdminUser, useChangeUserRole, useBanUser } from '@/lib/api/admin/admin.query';
import { Button } from '@/components/ui/button';

export default function AdminUserDetail() {
    const params = useParams() as { id?: string };
    const id = params?.id || '';
    const router = useRouter();
    const { data: user, isLoading, refetch } = useGetAdminUser(id);
    const changeRoleMutation = useChangeUserRole();
    const banMutation = useBanUser();

    const changeRole = (role: string) => changeRoleMutation.mutate({ userId: id, payload: { role } }, { onSuccess: () => refetch() });
    const ban = () => banMutation.mutate({ userId: id, payload: { banned: true } }, { onSuccess: () => refetch() });

    if (isLoading) return <p>در حال بارگذاری...</p>;

    return (
        <div className={styles['form_wrapper']}>
            <HeaderTitle title='جزئیات کاربر' />
            {user ? (
                <div>
                    <p>ایمیل: {user.email}</p>
                    <p>نقش: {user.role}</p>
                    <p>تاریخ ایجاد: {user.createdAt}</p>
                    <div className='mt-4 flex items-center gap-2'>
                        <Button variant='outline' size='sm' onClick={() => changeRole(user.role === 'ADMIN' ? 'USER' : 'ADMIN')}>
                            تغییر نقش
                        </Button>
                        <Button variant='destructive' size='sm' onClick={ban}>
                            مسدود/آن‌بلاک
                        </Button>
                        <Button variant='outline' size='sm' onClick={() => router.back()}>
                            بازگشت
                        </Button>
                    </div>
                </div>
            ) : (
                <p>کاربر یافت نشد.</p>
            )}
        </div>
    );
}
