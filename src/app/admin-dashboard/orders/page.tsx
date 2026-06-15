'use client';
import { HeaderTitle } from '@/components';
import { Button } from '@/components/ui/button';
import { DesktopTable } from '@/components/ui/table/desktop-table';
import { MobileCardTable } from '@/components/ui/table/mobile-table';
import styles from '../admin-dashboard.module.css';
import { useGetAdminOrders, useUpdateAdminOrderStatus } from '@/lib/api/admin/admin.query';
import { AdminOrderStatus } from '@/lib/api/admin/admin.orders.dto';

export default function OrdersPage() {
    const { data: orders, isLoading, refetch } = useGetAdminOrders();
    const updateOrderStatus = useUpdateAdminOrderStatus();

    const changeStatus = (id: string, status: AdminOrderStatus) => {
        updateOrderStatus.mutate({ id, payload: { status } }, { onSuccess: () => refetch() });
    };

    const rows =
        orders?.map(order => ({
            id: order.id,
            fields: [
                { label: 'شماره سفارش', value: order.id },
                { label: 'مبلغ', value: order.total },
                { label: 'وضعیت', value: order.status },
            ],
            actions: (
                <div className='flex gap-2 items-center'>
                    <Button variant='outline' size='sm' onClick={() => changeStatus(order.id, 'SHIPPED')}>
                        ارسال شد
                    </Button>
                    <Button variant='destructive' size='sm' onClick={() => changeStatus(order.id, 'CANCELLED')}>
                        لغو
                    </Button>
                </div>
            ),
        })) ?? [];

    return (
        <div className={styles['form_wrapper']}>
            <HeaderTitle title='سفارشات' />

            <DesktopTable
                head={['شماره سفارش', 'مبلغ', 'وضعیت', 'اقدامات']}
                isLoading={isLoading}
                isShowEmptyState={!orders?.length}
                body={
                    <tbody>
                        {orders?.map(o => (
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
