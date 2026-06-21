'use client';

import { useCart } from '@/app/cart/cart.model';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { BookOpen, MinusIcon, Plus, Trash } from 'lucide-react';
import styles from './cart.module.css';
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';

const Cart = () => {
    const { cartData, updateCartItemHandler, removeCart } = useCart();
    if (cartData?.itemCount.toString() && cartData?.itemCount === 0) {
        return (
            <div className='min-h-[calc(100vh-100px)] flex justify-center items-center'>
                <Empty>
                    <EmptyHeader>
                        <EmptyMedia variant='icon'>
                            <BookOpen />
                        </EmptyMedia>
                        <EmptyTitle>
                            <Typography>هنوز محصولی به سبد خرید خود اضافه نکرده اید!</Typography>
                        </EmptyTitle>
                    </EmptyHeader>
                </Empty>
            </div>
        );
    }
    return (
        <div className={styles.cart}>
            <div className='col-span-2 flex flex-col gap-5'>
                {cartData?.itemCount && cartData?.itemCount > 0 ? (
                    <Button onClick={() => removeCart()} variant='outline' className='flex w-fit'>
                        <Trash className='size-4' />
                        <Typography variant='body2'>حذف سبد خرید</Typography>
                    </Button>
                ) : null}
                {cartData?.cart.cartItems?.map(card => (
                    <Card key={card?.id} className='p-5'>
                        <div className='grid grid-cols-2 gap-8 '>
                            <img src={card?.product?.images[0]} alt={card?.product?.name} className='size-32' />
                            <div className='flex flex-col justify-content gap-6'>
                                <Typography className='text-secondary' variant='body1'>
                                    {card?.product?.name}
                                </Typography>
                                <Typography weight='bold' variant='body1'>
                                    {card?.product?.price.toLocaleString('fa')} تومان
                                </Typography>
                                <div className='flex gap-1'>
                                    <Button
                                        onClick={() => updateCartItemHandler({ productId: card?.id, type: 'increment' })}
                                        size='icon-xs'
                                        className='rotate-180 rounded-xl!'
                                    >
                                        <Plus />
                                    </Button>

                                    <Button size='icon-xs' variant='outline'>
                                        {card?.quantity}
                                    </Button>

                                    <Button
                                        onClick={() => updateCartItemHandler({ productId: card?.id, type: 'decrement' })}
                                        size='icon-xs'
                                        className='rotate-180 bg-secondary rounded-xl! '
                                    >
                                        <MinusIcon />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
            {cartData?.itemCount && cartData?.itemCount > 0 ? (
                <Card className='p-5 col-span-2 md:col-span-1 md:h-[184px] md:sticky md:top-[185px]'>
                    <div className='flex items-center justify-between gap-2'>
                        <Typography className='text-secondary' variant='body2' lg-variant='body1'>
                            تعداد آیتم های سفارش:
                        </Typography>
                        <Typography weight='bold' variant='body2' lg-variant='body1' className='text-end'>
                            {cartData?.itemCount.toLocaleString('fa')}
                        </Typography>
                    </div>

                    <div className='flex items-center justify-between gap-2'>
                        <Typography variant='body2' lg-variant='body1' className='text-secondary text-nowrap'>
                            جمع کل سفارش :
                        </Typography>
                        <Typography variant='body2' lg-variant='body1' weight='bold' className='text-end'>
                            {cartData?.subtotal.toLocaleString('fa')} تومان
                        </Typography>
                    </div>

                    <Button>تسویه حساب</Button>
                </Card>
            ) : null}
        </div>
    );
};
export default Cart;
