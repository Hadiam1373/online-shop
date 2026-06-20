import { useGetCart, useUpdateCartItem } from '@/lib/api/cart/cart.query';
import { useQueryClient } from '@tanstack/react-query';

export const useCart = () => {
    const { data: cartData } = useGetCart();
    const { mutateAsync: updateCartItem } = useUpdateCartItem();
    const queryClient = useQueryClient();
    const updateCartItemHandler = async (data: { productId: string; type: string }) => {
        try {
            await updateCartItem({ id: data.productId, payload: { type: data.type } });
            await queryClient.invalidateQueries({ queryKey: ['cart'] });
        } catch (error) {
            console.error('Error updating cart item:', error);
        }
    };

    return { cartData, updateCartItemHandler };
};
