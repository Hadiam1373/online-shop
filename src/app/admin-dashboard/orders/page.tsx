'use client';
import { HeaderTitle } from '@/components';
import styles from '../admin-dashboard.module.css';
import { useGetAdminOrders, useUpdateAdminOrderStatus } from '@/lib/api/admin/admin.query';
import { AdminOrderStatus } from '@/lib/api/admin/admin.orders.dto';

export default function OrdersPage() {
    const { data: orders, isLoading, refetch } = useGetAdminOrders();
    const updateOrderStatus = useUpdateAdminOrderStatus();

    const changeStatus = (id: string, status: AdminOrderStatus) => {
        updateOrderStatus.mutate(
            { id, payload: { status } },
            {
                onSuccess: () => refetch(),
            },
        );
    };

    return (
        <div className={styles['form_wrapper']}>
            <HeaderTitle title='سفارشات' />
            {isLoading && <p>در حال بارگذاری...</p>}
            {!isLoading && orders && (
                <table className='w-full text-right mt-4'>
                    <thead>
                        <tr className='text-sm text-muted-foreground'>
                            <th>شماره سفارش</th>
                            <th>مبلغ</th>
                            <th>وضعیت</th>
                            <th>اقدامات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(o => (
                            <tr key={o.id} className='border-t'>
                                <td className='py-2'>{o.id}</td>
                                <td className='py-2'>{o.total}</td>
                                <td className='py-2'>{o.status}</td>
                                <td className='py-2'>
                                    <button className='btn' onClick={() => changeStatus(o.id, 'SHIPPED')}>
                                        ارسال شد
                                    </button>
                                    <button className='btn ml-2' onClick={() => changeStatus(o.id, 'CANCELLED')}>
                                        لغو
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
