'use client';
import { OrderStatusBadge } from '@/app/admin-dashboard/orders/orders.model';
import { Button } from '@/components/ui/button';
import { useGetAdminPayments, useRefundAdminPayment } from '@/lib/api/admin/admin.query';
import { useQueryClient } from '@tanstack/react-query';

export const usePaymentModel = () => {
    const { data: payments, isLoading, refetch } = useGetAdminPayments();
    const refundMutation = useRefundAdminPayment();
    const queryClient = useQueryClient();

    const refund = (paymentId: string) => {
        refundMutation.mutate(paymentId, { onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-payments'] }) });
    };

    const rows =
        payments?.data.map(payment => ({
            id: payment.id,
            fields: [
                { label: 'پرداخت', value: payment.id },
                { label: 'مقدار', value: payment.amount },
                { label: 'وضعیت', value: <OrderStatusBadge status={payment.status} /> },
            ],
            actions: (
                <div className='flex gap-2 items-center'>
                    {payment.status === 'SUCCESS' && (
                        <Button variant='destructive' size='sm' onClick={() => refund(payment.id)}>
                            بازپرداخت
                        </Button>
                    )}
                </div>
            ),
        })) ?? [];

    return { payments, isLoading, refund, rows };
};
