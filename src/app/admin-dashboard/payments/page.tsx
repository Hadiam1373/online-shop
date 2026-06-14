'use client';
import { HeaderTitle } from '@/components';
import styles from '../admin-dashboard.module.css';
import { useGetAdminPayments, useRefundAdminPayment } from '@/lib/api/admin/admin.query';

export default function PaymentsPage() {
    const { data: payments, isLoading, refetch } = useGetAdminPayments();
    const refundMutation = useRefundAdminPayment();

    const refund = (paymentId: string) => {
        refundMutation.mutate(paymentId, { onSuccess: () => refetch() });
    };

    return (
        <div className={styles['form_wrapper']}>
            <HeaderTitle title='پرداخت‌ها' />
            {isLoading && <p>در حال بارگذاری...</p>}
            {!isLoading && payments && (
                <table className='w-full text-right mt-4'>
                    <thead>
                        <tr className='text-sm text-muted-foreground'>
                            <th>پرداخت</th>
                            <th>مقدار</th>
                            <th>وضعیت</th>
                            <th>اقدامات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map(p => (
                            <tr key={p.id} className='border-t'>
                                <td className='py-2'>{p.id}</td>
                                <td className='py-2'>{p.amount}</td>
                                <td className='py-2'>{p.status}</td>
                                <td className='py-2'>
                                    <button className='btn' onClick={() => refund(p.id)}>
                                        بازپرداخت
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
