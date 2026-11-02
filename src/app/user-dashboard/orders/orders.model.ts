import { useCancelOrder, useGetOrders } from '@/lib/api/orders/orders.query';
import { useStartZarinpalPayment } from '@/lib/api/zarinpal/zarinpal.query';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export const useOrders = () => {
    const [openModal, setOpenModal] = useState(false);
    const [page, setPage] = useState(1);
    const { data, isPending, isError } = useGetOrders({ params: { limit: 5, page: page } });
    const { mutate: cancelOrder } = useCancelOrder();
    const { mutateAsync: startPayment } = useStartZarinpalPayment();
    const queryClient = useQueryClient();

    const currentOrderStatus = (status: string) => {
        switch (status) {
            case 'PENDING':
                return 'در انتظار پرداخت';
            case 'PAID':
                return 'پرداخت شده';
            case 'SHIPED':
                return 'ارسال شده';
            case 'DELIVERED':
                return 'تحویل داده شده';
            case 'CANCELLED':
                return 'لغو شده';
            default:
                return status;
        }
    };

    const handleCancelOrder = (id: string) => {
        cancelOrder(id, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['orders'] });
                setOpenModal(false);
            },
        });
    };

    const handleStartPayment = async (orderId: string) => {
        try {
            const result = await startPayment({ orderId });
            if (!result.paymentUrl) {
                throw new Error('Payment provider did not return a payment URL');
            }
            window.location.assign(result.paymentUrl);
        } catch (error) {
            console.error('Error starting order payment:', error);
        }
    };

    return {
        orders: data,
        isPending,
        isError,
        currentOrderStatus,
        handleCancelOrder,
        handleStartPayment,
        openModal,
        setOpenModal,
        page,
        setPage,
    };
};
