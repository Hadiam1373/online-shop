'use client';
import { HeaderTitle } from '@/components';
import { DesktopTable } from '@/components/ui/table/desktop-table';
import { MobileCardTable } from '@/components/ui/table/mobile-table';
import styles from '../admin-dashboard.module.css';
import { usePaymentModel } from '@/app/admin-dashboard/payments/payments.model';
import { OrderStatusBadge } from '@/app/admin-dashboard/orders/orders.model';
import { Button } from '@/components/ui/button';

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
                            <tr key={p.id} className='border-t border-border'>
                                <td className='py-2'>{p.id}</td>
                                <td className='py-2'>{p.amount}</td>
                                <td className='py-2'>
                                    <OrderStatusBadge status={p.status} />
                                </td>
                                <td className='py-2'>
                                    {p.status === 'SUCCESS' && (
                                        <Button variant='destructive' size='sm' type='button' onClick={() => refund(p.id)}>
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
