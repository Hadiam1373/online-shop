import { Button } from '@/components/ui/button';
import { AdminOrderStatus } from '@/lib/api/admin/admin.orders.dto';
import { useGetAdminOrders, useUpdateAdminOrderStatus } from '@/lib/api/admin/admin.query.orders';

export const OrderModel = () => {
    const { data: orders, isLoading, refetch } = useGetAdminOrders();
    const updateOrderStatus = useUpdateAdminOrderStatus();

    const changeStatus = (id: string, status: AdminOrderStatus) => {
        updateOrderStatus.mutate({ id, payload: { status } }, { onSuccess: () => refetch() });
    };

    const rows =
        orders?.data.map(order => ({
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

    return { orders, isLoading, changeStatus, rows };
};
