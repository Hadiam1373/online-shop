'use client';
import { Typography } from '@/components/ui/typography';
import { useGetCart } from '@/lib/api/cart/cart.query';
import { ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const Basket = () => {
    const { data } = useGetCart();
    const navigate = useRouter();
    return (
        <div onClick={() => navigate.push('/cart')} className='relative cursor-pointer rounded-full text-destructive'>
            <Typography
                variant='caption'
                weight='bold'
                className='bg-amber-100 size-6 flex justify-center items-center text-center rounded-full absolute -top-2 -right-4'
            >
                {data?.itemCount.toLocaleString('fa') || 0}
            </Typography>
            <ShoppingCart />
        </div>
    );
};
