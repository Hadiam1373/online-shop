import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { currentOrderStatus } from '@/hooks/useCurrentStatus';
import { AdminOrderStatus } from '@/lib/api/admin/admin.orders.dto';
import { useGetAdminOrders, useUpdateAdminOrderStatus } from '@/lib/api/admin/admin.query.orders';
import { useQueryClient } from '@tanstack/react-query';

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
                { label: 'مبلغ', value: order.total },
                { label: 'وضعیت', value: currentOrderStatus(order.status) },
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
