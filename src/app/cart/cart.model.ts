import { useGetCart } from '@/lib/api/cart/cart.query';

export const useCart = () => {
    const { data: cartData } = useGetCart();

    return { cartData };
};
