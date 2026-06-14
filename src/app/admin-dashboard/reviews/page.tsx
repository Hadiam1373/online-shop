'use client';
import { HeaderTitle } from '@/components';
import styles from '../admin-dashboard.module.css';
import { useGetAdminPendingReviews, useModerateAdminReview } from '@/lib/api/admin/admin.query';

export default function ReviewsPage() {
    const { data: pending, isLoading, refetch } = useGetAdminPendingReviews();
    const moderateMutation = useModerateAdminReview();

    const moderate = (id: string, approved: boolean) => {
        moderateMutation.mutate({ id, approve: approved }, { onSuccess: () => refetch() });
    };

    return (
        <div className={styles['form_wrapper']}>
            <HeaderTitle title='نظرات' />
            {isLoading && <p>در حال بارگذاری...</p>}
            {!isLoading && pending && (
                <div className='mt-4'>
                    {pending.length === 0 ? (
                        <p>نظر منتظر تایید وجود ندارد.</p>
                    ) : (
                        <table className='w-full text-right'>
                            <thead>
                                <tr className='text-sm text-muted-foreground'>
                                    <th>کاربر</th>
                                    <th>متن</th>
                                    <th>اقدامات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pending.map(r => (
                                    <tr key={r.id} className='border-t'>
                                        <td className='py-2'>{r.user?.email || r.userId}</td>
                                        <td className='py-2'>{r.comment ?? r.text}</td>
                                        <td className='py-2'>
                                            <button className='btn' onClick={() => moderate(r.id, true)}>
                                                تایید
                                            </button>
                                            <button className='btn ml-2' onClick={() => moderate(r.id, false)}>
                                                رد
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </div>
    );
}
