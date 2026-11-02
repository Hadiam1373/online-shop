import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { currentOrderStatus } from '@/hooks/useCurrentStatus';
import { AdminOrderStatus } from '@/lib/api/admin/admin.orders.dto';
import { useGetAdminOrders, useUpdateAdminOrderStatus } from '@/lib/api/admin/admin.query.orders';
import { useQueryClient } from '@tanstack/react-query';

const ORDER_STATUS_BADGE_CLASS: Record<string, string> = {
    PENDING: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    PAID: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    SHIPPED: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    DELIVERED: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    CANCELLED: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    SUCCESS: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    FAILURE: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

export const OrderStatusBadge = ({ status }: { status: string }) => (
    <span
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${ORDER_STATUS_BADGE_CLASS[status] ?? 'bg-muted text-muted-foreground'}`}
    >
        {currentOrderStatus(status)}
    </span>
);

export const OrderModel = () => {
    const { data: orders, isLoading } = useGetAdminOrders();
    const updateOrderStatus = useUpdateAdminOrderStatus();
    const queryClient = useQueryClient();

    const changeStatus = (id: string, status: AdminOrderStatus) => {
        updateOrderStatus.mutate(
            { id, payload: { status } },
            { onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-orders'] }) },
        );
    };

    const rows =
        orders?.data.map(order => ({
            id: order.id,
            fields: [
                { label: 'شماره سفارش', value: order.id },
                { label: 'گیرنده', value: [order.recipientFirstName, order.recipientLastName].filter(Boolean).join(' ') || '---' },
                { label: 'شماره تماس', value: order.recipientPhone || '---' },
                {
                    label: 'نشانی تحویل',
                    value: [order.province, order.city, order.address, order.postalCode].filter(Boolean).join('، ') || '---',
                },
                { label: 'مبلغ', value: order.total },
                { label: 'وضعیت', value: <OrderStatusBadge status={order.status} /> },
            ],
            actions: (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='outline' size='sm'>
                            عملیات
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuGroup className='w-[150px]'>
                            <DropdownMenuItem onClick={() => changeStatus(order.id, 'SHIPPED')}>ارسال </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => changeStatus(order.id, 'PAID')}>پرداخت </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => changeStatus(order.id, 'PENDING')}>در انتظار پرداخت </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => changeStatus(order.id, 'DELIVERED')}>تحویل داده شده</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => changeStatus(order.id, 'CANCELLED')}>لغو</DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        })) ?? [];

    return { orders, isLoading, changeStatus, rows };
};
