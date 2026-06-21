'use client';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { HeaderTitle } from '@/components';
import styles from '../../admin-dashboard.module.css';
import { useGetAdminUser, useChangeUserRole, useBanUser } from '@/lib/api/admin/admin.query';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Typography } from '@/components/ui/typography';

export default function AdminUserDetail() {
    const params = useParams() as { id?: string };
    const id = params?.id || '';
    const router = useRouter();
    const { data: user, isLoading } = useGetAdminUser(id);
    const changeRoleMutation = useChangeUserRole();
    const banMutation = useBanUser();
    const queryClient = useQueryClient();

    const changeRole = (role: string) =>
        changeRoleMutation.mutate(
            { userId: id, payload: { role } },
            { onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-users'] }) },
        );
    const ban = () =>
        banMutation.mutate(
            { userId: id, payload: { banned: true } },
            { onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-users'] }) },
        );

    if (isLoading) {
        return (
            <div className={styles['form_wrapper']}>
                <HeaderTitle title='جزئیات کاربر' />
                <div className='flex w-full justify-center py-10'>
                    <Spinner />
                </div>
            </div>
        );
    }

    return (
        <div className={styles['form_wrapper']}>
            <HeaderTitle title='جزئیات کاربر' />
            {user ? (
                <div className='rounded-2xl border border-border bg-card p-5 space-y-4'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        <div>
                            <Typography variant='body2' className='text-muted-foreground'>
                                ایمیل
                            </Typography>
                            <Typography variant='subtitle2' weight='bold' className='mt-1 text-foreground'>
                                {user.email ?? 'بدون ایمیل'}
                            </Typography>
                        </div>
                        <div>
                            <Typography variant='body2' className='text-muted-foreground'>
                                نقش
                            </Typography>
                            <Typography variant='subtitle2' weight='bold' className='mt-1 text-foreground'>
                                {user.role}
                            </Typography>
                        </div>
                        <div>
                            <Typography variant='body2' className='text-muted-foreground'>
                                تاریخ ایجاد
                            </Typography>
                            <Typography variant='subtitle2' weight='bold' className='mt-1 text-foreground'>
                                {user.createdAt}
                            </Typography>
                        </div>
                    </div>

                    <div className='flex flex-wrap items-center gap-2 border-t border-border pt-4'>
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
                <Typography variant='body1' className='text-muted-foreground'>
                    کاربر یافت نشد.
                </Typography>
            )}
        </div>
    );
}
