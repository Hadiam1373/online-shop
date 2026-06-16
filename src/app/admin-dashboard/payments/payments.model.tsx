'use client';
import { Button } from '@/components/ui/button';
import { currentOrderStatus } from '@/hooks/useCurrentStatus';
import { useGetAdminPayments, useRefundAdminPayment } from '@/lib/api/admin/admin.query';

export const usePaymentModel = () => {
    const { data: payments, isLoading, refetch } = useGetAdminPayments();
    const refundMutation = useRefundAdminPayment();

    const refund = (paymentId: string) => {
        refundMutation.mutate(paymentId, { onSuccess: () => refetch() });
    };

    const rows =
        payments?.data.map(payment => ({
            id: payment.id,
            fields: [
                { label: 'پرداخت', value: payment.id },
                { label: 'مقدار', value: payment.amount },
                { label: 'وضعیت', value: currentOrderStatus(payment.status) },
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
