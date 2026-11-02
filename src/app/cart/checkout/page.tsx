'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGetCart } from '@/lib/api/cart/cart.query';
import { useCreateOrder } from '@/lib/api/orders/orders.query';
import { useGetProfile } from '@/lib/api/users/users.query';
import { useStartZarinpalPayment } from '@/lib/api/zarinpal/zarinpal.query';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Typography } from '@/components/ui/typography';
import { Spinner } from '@/components/ui/spinner';
import { CheckoutFormValues, checkoutSchema } from './checkout.schema';
import { LoaderCircle } from 'lucide-react';

const formatPrice = (price: number) => `${price.toLocaleString('fa-IR')} تومان`;

const CheckoutPage = () => {
    const { data: cartData, isLoading: isCartLoading, isError: isCartError } = useGetCart();
    const { data: profile, isLoading: isProfileLoading, isError: isProfileError, refetch: refetchProfile } = useGetProfile();
    const { mutateAsync: createOrder, isPending: isCreatingOrder } = useCreateOrder();
    const { mutateAsync: startPayment, isPending: isStartingPayment } = useStartZarinpalPayment();
    const queryClient = useQueryClient();
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [orderNeedsPayment, setOrderNeedsPayment] = useState(false);
    const [isRedirectingToPayment, setIsRedirectingToPayment] = useState(false);
    const methods = useForm<CheckoutFormValues>({
        resolver: yupResolver(checkoutSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            province: '',
            city: '',
            address: '',
            postalCode: '',
            deliveryNotes: '',
        },
    });
    const { reset } = methods;
    const hasPrefilledProfile = useRef(false);

    useEffect(() => {
        if (!profile || hasPrefilledProfile.current) return;

        reset({
            firstName: profile.firstName || '',
            lastName: profile.lastName || '',
            province: profile.province || '',
            city: profile.city || '',
            address: profile.address || '',
            postalCode: profile.postalCode || '',
            deliveryNotes: profile.deliveryNotes || '',
        });
        hasPrefilledProfile.current = true;
    }, [profile, reset]);

    const onSubmit = async (values: CheckoutFormValues) => {
        setSubmitError(null);
        setIsRedirectingToPayment(true);
        let orderCreated = false;

        try {
            const result = await createOrder(values);
            orderCreated = true;
            await Promise.all([
                queryClient.invalidateQueries({ queryKey: ['orders'] }),
                queryClient.invalidateQueries({ queryKey: ['user-profile'] }),
            ]);

            const payment = await startPayment({ orderId: result.order.id });
            if (!payment.paymentUrl) {
                throw new Error('Payment provider did not return a payment URL');
            }

            window.location.assign(payment.paymentUrl);
        } catch (error) {
            console.error('Checkout failed:', error);
            setIsRedirectingToPayment(false);
            if (orderCreated) {
                setOrderNeedsPayment(true);
            } else {
                setSubmitError('ثبت سفارش انجام نشد. لطفاً اطلاعات و سبد خرید را بررسی و دوباره تلاش کنید.');
            }
        }
    };

    if (isCartLoading) {
        return (
            <div className='flex min-h-[50vh] items-center justify-center'>
                <Spinner />
            </div>
        );
    }

    if (isCartError) {
        return (
            <div className='mx-auto mt-12 max-w-xl px-4 text-center'>
                <Typography variant='subtitle1' weight='bold'>دریافت سبد خرید ممکن نشد</Typography>
                <Typography className='mt-2 text-muted-foreground'>لطفاً دوباره تلاش کنید یا به سبد خرید برگردید.</Typography>
                <Button asChild className='mt-4'>
                    <Link href='/cart'>بازگشت به سبد خرید</Link>
                </Button>
            </div>
        );
    }

    if (isProfileLoading) {
        return (
            <div className='flex min-h-[50vh] items-center justify-center'>
                <Spinner />
            </div>
        );
    }

    if (isProfileError || !profile) {
        return (
            <div className='mx-auto mt-12 max-w-xl px-4 text-center'>
                <Typography variant='subtitle1' weight='bold'>دریافت اطلاعات پروفایل ممکن نشد</Typography>
                <Typography className='mt-2 text-muted-foreground'>برای پر شدن خودکار مشخصات ارسال، دوباره تلاش کنید.</Typography>
                <Button className='mt-4' onClick={() => refetchProfile()}>
                    تلاش دوباره
                </Button>
            </div>
        );
    }

    if (isRedirectingToPayment) {
        return (
            <div className='flex min-h-[calc(100vh-100px)] flex-col items-center justify-center gap-5 px-4 text-center'>
                <div className='flex size-20 items-center justify-center rounded-full bg-primary/10 text-primary'>
                    <LoaderCircle className='size-10 animate-spin' aria-hidden='true' />
                </div>
                <div className='space-y-2'>
                    <Typography variant='subtitle1' weight='bold'>در حال انتقال به درگاه پرداخت</Typography>
                    <Typography variant='body2' className='text-muted-foreground'>
                        لطفاً کمی صبر کنید و این صفحه را نبندید.
                    </Typography>
                    <Typography variant='caption' className='text-muted-foreground'>
                        سبد خرید شما تا تأیید پرداخت محفوظ می‌ماند.
                    </Typography>
                </div>
            </div>
        );
    }

    if (orderNeedsPayment) {
        return (
            <div className='mx-auto mt-12 max-w-xl px-4 text-center'>
                <Typography variant='subtitle1' weight='bold'>سفارش ثبت شد، اما پرداخت آغاز نشد</Typography>
                <Typography className='mt-2 text-muted-foreground'>
                    برای پیگیری یا تلاش دوباره، به بخش سفارش‌های من بروید.
                </Typography>
                <Button asChild className='mt-4'>
                    <Link href='/user-dashboard/orders'>رفتن به سفارش‌های من</Link>
                </Button>
            </div>
        );
    }

    if (!cartData || cartData.itemCount === 0) {
        return (
            <div className='mx-auto mt-12 max-w-xl px-4 text-center'>
                <Typography variant='subtitle1' weight='bold'>سبد خرید شما خالی است</Typography>
                <Button asChild className='mt-4'>
                    <Link href='/products'>مشاهده محصولات</Link>
                </Button>
            </div>
        );
    }

    const estimatedTax = cartData.subtotal * 0.1;
    const estimatedTotal = cartData.subtotal + estimatedTax;
    const isSubmitting = isCreatingOrder || isStartingPayment;

    return (
        <form onSubmit={methods.handleSubmit(onSubmit)} className='mx-auto mt-8 grid w-full max-w-[1280px] grid-cols-1 gap-6 px-4 md:grid-cols-3 md:px-6 lg:px-8'>
            <div className='flex flex-col gap-6 md:col-span-2'>
                <div>
                    <Typography as='h1' variant='subtitle1' md-variant='h6' weight='bold'>
                        اطلاعات گیرنده و ارسال
                    </Typography>
                    <Typography variant='body2' className='mt-1 text-muted-foreground'>
                        برای تحویل سفارش، مشخصات گیرنده و نشانی دقیق را وارد کنید.
                    </Typography>
                </div>

                {submitError && (
                    <Card role='alert' className='border border-destructive/40 p-4'>
                        <Typography className='text-destructive'>{submitError}</Typography>
                    </Card>
                )}

                <Card className='gap-5 p-5'>
                    <Typography variant='body1' weight='bold'>مشخصات گیرنده</Typography>
                    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                        <Input
                            {...methods.register('firstName')}
                            label='نام'
                            placeholder='نام گیرنده'
                            autoComplete='given-name'
                            error={methods.formState.errors.firstName?.message}
                        />
                        <Input
                            {...methods.register('lastName')}
                            label='نام خانوادگی'
                            placeholder='نام خانوادگی گیرنده'
                            autoComplete='family-name'
                            error={methods.formState.errors.lastName?.message}
                        />
                    </div>
                    <div>
                        <Input
                            label='شماره تماس ثبت‌شده'
                            value={profile?.phone ?? ''}
                            placeholder='شماره تلفن حساب شما'
                            readOnly
                            autoComplete='tel'
                        />
                        <Typography variant='caption' className='mt-1 text-muted-foreground'>
                            برای هماهنگی ارسال از شماره‌ای که با آن وارد شده‌اید استفاده می‌شود.
                        </Typography>
                    </div>
                </Card>

                <Card className='gap-5 p-5'>
                    <Typography variant='body1' weight='bold'>نشانی تحویل</Typography>
                    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                        <Input
                            {...methods.register('province')}
                            label='استان'
                            placeholder='استان'
                            autoComplete='address-level1'
                            error={methods.formState.errors.province?.message}
                        />
                        <Input
                            {...methods.register('city')}
                            label='شهر'
                            placeholder='شهر'
                            autoComplete='address-level2'
                            error={methods.formState.errors.city?.message}
                        />
                    </div>
                    <Textarea
                        {...methods.register('address')}
                        label='آدرس کامل'
                        placeholder='خیابان، کوچه، پلاک، واحد و سایر جزئیات نشانی'
                        autoComplete='street-address'
                        rows={3}
                        error={methods.formState.errors.address?.message}
                    />
                    <Input
                        {...methods.register('postalCode')}
                        label='کد پستی'
                        placeholder='۱۰ رقم'
                        inputMode='numeric'
                        autoComplete='postal-code'
                        maxLength={10}
                        error={methods.formState.errors.postalCode?.message}
                    />
                    <Textarea
                        {...methods.register('deliveryNotes')}
                        label='توضیحات تحویل (اختیاری)'
                        placeholder='مثلاً زمان مناسب تحویل یا توضیح تکمیلی'
                        rows={2}
                        error={methods.formState.errors.deliveryNotes?.message}
                    />
                </Card>
            </div>

            <Card className='h-fit gap-4 p-5 md:sticky md:top-28 md:col-span-1'>
                <Typography variant='body1' weight='bold'>خلاصه سفارش</Typography>
                <div className='flex items-center justify-between gap-2'>
                    <Typography variant='body2' className='text-muted-foreground'>تعداد کالا</Typography>
                    <Typography variant='body2' weight='bold'>{cartData.itemCount.toLocaleString('fa-IR')}</Typography>
                </div>
                <div className='flex items-center justify-between gap-2'>
                    <Typography variant='body2' className='text-muted-foreground'>جمع کالاها</Typography>
                    <Typography variant='body2' weight='bold'>{formatPrice(cartData.subtotal)}</Typography>
                </div>
                <div className='flex items-center justify-between gap-2'>
                    <Typography variant='body2' className='text-muted-foreground'>مالیات (۱۰٪)</Typography>
                    <Typography variant='body2' weight='bold'>{formatPrice(estimatedTax)}</Typography>
                </div>
                <div className='flex items-center justify-between gap-2 border-t border-border pt-4'>
                    <Typography variant='body2' weight='bold'>مبلغ قابل پرداخت</Typography>
                    <Typography variant='body2' weight='bold' className='text-primary'>{formatPrice(estimatedTotal)}</Typography>
                </div>
                <Typography variant='caption' className='text-muted-foreground'>
                    شماره تماس حساب شما و اطلاعات همین نشانی روی سفارش ثبت می‌شود.
                </Typography>
                <Button type='submit' size='lg' disabled={isSubmitting}>
                    {isSubmitting ? 'در حال ثبت سفارش...' : 'ثبت سفارش و پرداخت'}
                </Button>
                <Button asChild variant='outline'>
                    <Link href='/cart'>بازگشت به سبد خرید</Link>
                </Button>
            </Card>
        </form>
    );
};

export default CheckoutPage;
