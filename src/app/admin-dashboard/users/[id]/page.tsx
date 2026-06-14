'use client';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { HeaderTitle } from '@/components';
import styles from '../../admin-dashboard.module.css';
import { useGetAdminUser, useChangeUserRole, useBanUser } from '@/lib/api/admin/admin.query';

export default function AdminUserDetail() {
    const params = useParams() as { id?: string };
    const id = params?.id || '';
    const router = useRouter();
    const { data: user, isLoading, refetch } = useGetAdminUser(id);
    const changeRoleMutation = useChangeUserRole();
    const banMutation = useBanUser();

    const changeRole = (role: string) => changeRoleMutation.mutate({ userId: id, role }, { onSuccess: () => refetch() });
    const ban = () => banMutation.mutate(id, { onSuccess: () => refetch() });

    if (isLoading) return <p>در حال بارگذاری...</p>;

    return (
        <div className={styles['form_wrapper']}>
            <HeaderTitle title='جزئیات کاربر' />
            {user ? (
                <div>
                    <p>ایمیل: {user.email}</p>
                    <p>نقش: {user.role}</p>
                    <p>تاریخ ایجاد: {user.createdAt}</p>
                    <div className='mt-4'>
                        <button className='btn' onClick={() => changeRole(user.role === 'ADMIN' ? 'USER' : 'ADMIN')}>
                            تغییر نقش
                        </button>
                        <button className='btn ml-2' onClick={ban}>
                            مسدود/آن‌بلاک
                        </button>
                        <button className='btn ml-2' onClick={() => router.back()}>
                            بازگشت
                        </button>
                    </div>
                </div>
            ) : (
                <p>کاربر یافت نشد.</p>
            )}
        </div>
    );
}
