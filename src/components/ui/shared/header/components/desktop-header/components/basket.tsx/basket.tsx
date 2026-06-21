'use client';
import { Typography } from '@/components/ui/typography';
import { useGetCart } from '@/lib/api/cart/cart.query';
import { ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const Basket = () => {
    const { data } = useGetCart();
    const navigate = useRouter();
    if (data?.itemCount === 0) {
        return null;
    }
    return (
        <div
            onClick={() => navigate.push('/cart')}
            className='relative cursor-pointer rounded-full p-2 text-foreground transition-colors hover:bg-accent hover:text-primary'
        >
            <Typography
                variant='caption'
                weight='bold'
                className='bg-primary text-primary-foreground size-4 md:size-5 flex justify-center items-center text-center rounded-full absolute -top-0.5 -right-0.5'
            >
                {data?.itemCount.toLocaleString('fa') || 0}
            </Typography>
            <ShoppingCart className='size-5 md:size-6' />
        </div>
    );
};
