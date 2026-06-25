'use client';

import { useCart } from '@/app/cart/cart.model';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { BookOpen, MinusIcon, Plus, Trash } from 'lucide-react';
import styles from './cart.module.css';
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { Spinner } from '@/components/ui/spinner';

const Cart = () => {
    ``;
    const { cartData, updateCartItemHandler, removeCart, createOrderHandler, loadingPayment } = useCart();
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
            <div className='col-span-2 flex flex-col gap-4'>
                <div className='flex items-center justify-between'>
                    <Typography as='h1' variant='subtitle1' md-variant='h6' weight='bold' className='text-foreground'>
                        سبد خرید
                    </Typography>
                    {cartData?.itemCount && cartData?.itemCount > 0 ? (
                        <Button
                            onClick={() => removeCart()}
                            variant='ghost'
                            size='sm'
                            className='text-destructive hover:bg-destructive/10 hover:text-destructive'
                        >
                            <Trash className='size-4' />
                            <Typography variant='body2'>حذف سبد خرید</Typography>
                        </Button>
                    ) : null}
                </div>
                {cartData?.cart.cartItems?.map(card => (
                    <Card key={card?.id} className='p-4'>
                        <div className='flex gap-4'>
                            <img
                                src={card?.product?.images[0]}
                                alt={card?.product?.name}
                                className='size-24 md:size-28 rounded-xl object-cover bg-muted shrink-0'
                            />
                            <div className='flex flex-1 flex-col justify-between'>
                                <Typography className='text-foreground' variant='body1' weight='bold'>
                                    {card?.product?.name}
                                </Typography>
                                <div className='flex items-center justify-between mt-2'>
                                    <Typography weight='bold' variant='body1' className='text-primary'>
                                        {card?.product?.price.toLocaleString('fa')} تومان
                                    </Typography>
                                    <div className='flex items-center gap-2'>
                                        <Button
                                            onClick={() => updateCartItemHandler({ productId: card?.id, type: 'decrement' })}
                                            size='icon-sm'
                                            variant='outline'
                                            className='rounded-full'
                                        >
                                            <MinusIcon />
                                        </Button>

                                        <Typography variant='body2' weight='bold' className='w-6 text-center'>
                                            {card?.quantity.toLocaleString('fa')}
                                        </Typography>

                                        <Button
                                            onClick={() => updateCartItemHandler({ productId: card?.id, type: 'increment' })}
                                            size='icon-sm'
                                            className='rounded-full'
                                        >
                                            <Plus />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
            {cartData?.itemCount && cartData?.itemCount > 0 && !loadingPayment ? (
                <Card className='p-5 col-span-2 md:col-span-1 h-fit md:sticky md:top-28 gap-4'>
                    <Typography variant='body1' weight='bold' className='text-foreground'>
                        خلاصه سفارش
                    </Typography>
                    <div className='flex items-center justify-between gap-2'>
                        <Typography className='text-muted-foreground' variant='body2' lg-variant='body1'>
                            تعداد آیتم های سفارش:
                        </Typography>
                        <Typography weight='bold' variant='body2' lg-variant='body1' className='text-end'>
                            {cartData?.itemCount.toLocaleString('fa')}
                        </Typography>
                    </div>

                    <div className='flex items-center justify-between gap-2 border-t border-border pt-4'>
                        <Typography variant='body2' lg-variant='body1' className='text-muted-foreground text-nowrap'>
                            جمع کل سفارش :
                        </Typography>
                        <Typography variant='body2' lg-variant='body1' weight='bold' className='text-end text-primary'>
                            {cartData?.subtotal.toLocaleString('fa')} تومان
                        </Typography>
                    </div>

                    <Button size='lg' onClick={() => createOrderHandler()}>
                        تسویه حساب
                    </Button>
                </Card>
            ) : (
                <Spinner />
            )}
        </div>
    );
};
export default Cart;
