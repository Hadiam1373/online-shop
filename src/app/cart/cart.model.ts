import { useClearCart, useGetCart, useUpdateCartItem } from '@/lib/api/cart/cart.query';
import { useCreateOrder } from '@/lib/api/orders/orders.query';
import { useStartZarinpalPayment } from '@/lib/api/zarinpal/zarinpal.query';
import { useQueryClient } from '@tanstack/react-query';

export const useCart = () => {
    const { data: cartData } = useGetCart();
    const { mutateAsync: updateCartItem } = useUpdateCartItem();
    const { mutateAsync: clearCartMutate } = useClearCart();
    const { mutateAsync: createOrder } = useCreateOrder();
    const queryClient = useQueryClient();
    const { mutateAsync: createZarinPal } = useStartZarinpalPayment();
    const updateCartItemHandler = async (data: { productId: string; type: string }) => {
        try {
            await updateCartItem({ id: data.productId, payload: { type: data.type } });
            await queryClient.invalidateQueries({ queryKey: ['cart'] });
        } catch (error) {
            console.error('Error updating cart item:', error);
        }
    };

    const createOrderHandler = async () => {
        try {
            await createOrder(
                { couponCode: 'MYCOUPON' },
                {
                    onSuccess: r => {
                        console.log(r);
                        createZarinPal({ orderId: r.order.id });
                    },
                },
            );
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    };

    const removeCart = async () => {
        try {
            await clearCartMutate();
            await queryClient.invalidateQueries({ queryKey: ['cart'] });
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    };

    return { cartData, updateCartItemHandler, removeCart, createOrderHandler };
};
