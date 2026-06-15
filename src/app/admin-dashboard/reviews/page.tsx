'use client';
import { HeaderTitle } from '@/components';
import { Button } from '@/components/ui/button';
import { DesktopTable } from '@/components/ui/table/desktop-table';
import { MobileCardTable } from '@/components/ui/table/mobile-table';
import styles from '../admin-dashboard.module.css';
import { useGetAdminPendingReviews, useModerateAdminReview } from '@/lib/api/admin/admin.query';

export default function ReviewsPage() {
    const { data: pending, isLoading, refetch } = useGetAdminPendingReviews();
    const moderateMutation = useModerateAdminReview();

    const moderate = (id: string, approved: boolean) => {
        moderateMutation.mutate({ id, approve: approved }, { onSuccess: () => refetch() });
    };

    const rows =
        pending?.map(review => ({
            id: review.id,
            fields: [
                { label: 'کاربر', value: review.user?.email ?? review.userId },
                { label: 'نظر', value: review.comment ?? review.comment },
                { label: 'تاریخ', value: review.createdAt },
            ],
            actions: (
                <div className='flex gap-2 items-center'>
                    <Button variant='outline' size='sm' onClick={() => moderate(review.id, true)}>
                        تایید
                    </Button>
                    <Button variant='destructive' size='sm' onClick={() => moderate(review.id, false)}>
                        رد
                    </Button>
                </div>
            ),
        })) ?? [];

    return (
        <div className={styles['form_wrapper']}>
            <HeaderTitle title='نظرات' />

            <DesktopTable
                head={['کاربر', 'نظر', 'تاریخ', 'اقدامات']}
                isLoading={isLoading}
                isShowEmptyState={!pending?.length}
                body={
                    <tbody>
                        {pending?.map(r => (
                            <tr key={r.id} className='border-t'>
                                <td className='py-2'>{r.user?.email ?? r.userId}</td>
                                <td className='py-2'>{r.comment ?? r.comment}</td>
                                <td className='py-2'>{r.createdAt}</td>
                                <td className='py-2 flex gap-2'>
                                    <Button variant='outline' size='sm' onClick={() => moderate(r.id, true)}>
                                        تایید
                                    </Button>
                                    <Button variant='destructive' size='sm' onClick={() => moderate(r.id, false)}>
                                        رد
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                }
            />

            <MobileCardTable data={rows} loading={isLoading} emptyText='نظری موجود نیست' />
        </div>
    );
}
