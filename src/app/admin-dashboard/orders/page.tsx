'use client';
import { HeaderTitle } from '@/components';
import { Button } from '@/components/ui/button';
import { DesktopTable } from '@/components/ui/table/desktop-table';
import { MobileCardTable } from '@/components/ui/table/mobile-table';
import styles from '../admin-dashboard.module.css';
import { useGetAdminOrders, useUpdateAdminOrderStatus } from '@/lib/api/admin/admin.query';
import { AdminOrderStatus } from '@/lib/api/admin/admin.orders.dto';
import { OrderModel } from '@/app/admin-dashboard/orders/orders.model';

export default function OrdersPage() {
    const { orders, isLoading, changeStatus, rows } = OrderModel();

    return (
        <div className={styles['form_wrapper']}>
            <HeaderTitle title='سفارشات' />

            <DesktopTable
                head={['شماره سفارش', 'مبلغ', 'وضعیت', 'اقدامات']}
                isLoading={isLoading}
                isShowEmptyState={!orders?.data.length}
                body={
                    <tbody>
                        {orders?.data.map(o => (
                            <tr key={o.id} className='border-t'>
                                <td className='py-2'>{o.id}</td>
                                <td className='py-2'>{o.total}</td>
                                <td className='py-2'>{o.status}</td>
                                <td className='py-2 flex gap-2'>
                                    <Button variant='outline' size='sm' onClick={() => changeStatus(o.id, 'SHIPPED')}>
                                        ارسال شد
                                    </Button>
                                    <Button variant='destructive' size='sm' onClick={() => changeStatus(o.id, 'CANCELLED')}>
                                        لغو
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                }
            />

            <MobileCardTable data={rows} loading={isLoading} emptyText='سفارشی موجود نیست' />
        </div>
    );
}
