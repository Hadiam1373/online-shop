'use client';
import { HeaderTitle } from '@/components';
import { Button } from '@/components/ui/button';
import styles from '../admin-dashboard.module.css';
import { useGetAdminPayments, useRefundAdminPayment } from '@/lib/api/admin/admin.query';
import { DesktopTable } from '@/components/ui/table/desktop-table';
import { MobileCardTable } from '@/components/ui/table/mobile-table';

export default function PaymentsPage() {
    const { data: payments, isLoading, refetch } = useGetAdminPayments();
    const refundMutation = useRefundAdminPayment();

    const refund = (paymentId: string) => {
        refundMutation.mutate(paymentId, { onSuccess: () => refetch() });
    };

    const rows =
        payments?.map(payment => ({
            id: payment.id,
            fields: [
                { label: 'پرداخت', value: payment.id },
                { label: 'مقدار', value: payment.amount },
                { label: 'وضعیت', value: payment.status },
            ],
            actions: (
                <div className='flex gap-2 items-center'>
                    <Button variant='destructive' size='sm' onClick={() => refund(payment.id)}>
                        بازپرداخت
                    </Button>
                </div>
            ),
        })) ?? [];

    return (
        <div className={styles['form_wrapper']}>
            <HeaderTitle title='پرداخت‌ها' />

            <DesktopTable
                head={['پرداخت', 'مقدار', 'وضعیت', 'اقدامات']}
                isLoading={isLoading}
                isShowEmptyState={!payments?.length}
                body={
                    <tbody>
                        {payments?.map(p => (
                            <tr key={p.id} className='border-t'>
                                <td className='py-2'>{p.id}</td>
                                <td className='py-2'>{p.amount}</td>
                                <td className='py-2'>{p.status}</td>
                                <td className='py-2'>
                                    <Button variant='destructive' size='sm' onClick={() => refund(p.id)}>
                                        بازپرداخت
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                }
            />

            <MobileCardTable data={rows} loading={isLoading} emptyText='پرداختی موجود نیست' />
        </div>
    );
}
