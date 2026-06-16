'use client';
import { HeaderTitle } from '@/components';
import { DesktopTable } from '@/components/ui/table/desktop-table';
import { MobileCardTable } from '@/components/ui/table/mobile-table';
import styles from '../admin-dashboard.module.css';
import { usePaymentModel } from '@/app/admin-dashboard/payments/payments.model';
import { Button } from '@/components/ui/button';
import { currentOrderStatus } from '@/hooks/useCurrentStatus';

export default function PaymentsPage() {
    const { payments, isLoading, refund, rows } = usePaymentModel();

    return (
        <div className={styles['form_wrapper']}>
            <HeaderTitle title='پرداخت‌ها' />

            <DesktopTable
                head={['پرداخت', 'مقدار', 'وضعیت', 'اقدامات']}
                isLoading={isLoading}
                isShowEmptyState={!payments?.data.length}
                body={
                    <tbody>
                        {payments?.data.map(p => (
                            <tr key={p.id} className='border-t'>
                                <td className='py-2'>{p.id}</td>
                                <td className='py-2'>{p.amount}</td>
                                <td className='py-2'>{currentOrderStatus(p.status)}</td>
                                <td className='py-2'>
                                    {p.status === 'SUCCESS' && (
                                        <Button variant='destructive' type='button' onClick={() => refund(p.id)}>
                                            بازپرداخت
                                        </Button>
                                    )}
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
