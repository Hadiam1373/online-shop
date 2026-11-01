import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { PackageCheck, ShieldCheck } from 'lucide-react';
import { useProducts } from '../../products.model';

export const ProductBasket = () => {
    const { product, addProductToWhishloist, addToCartHandler } = useProducts();
    return (
        <>
            <div>
                <Typography variant='caption' className='text-muted-foreground'>
                    قیمت محصول
                </Typography>
                <Typography variant='h6' weight='bold' className='text-primary'>
                    {product?.price.toLocaleString('fa')} تومان
                </Typography>

                <Button
                    onClick={() => addToCartHandler({ productId: product!.id, quantity: 1 })}
                    variant='default'
                    size='lg'
                    className='w-full mt-4'
                >
                    افزودن به سبد خرید
                </Button>
                <Button onClick={() => addProductToWhishloist()} variant='outline' className='mt-2 w-full'>
                    افزودن به لیست مورد علاقه ها
                </Button>
            </div>

            <div className='mt-6 flex flex-col gap-3 border-t border-border pt-4'>
                <Typography variant='body2' as='div' className='flex items-center gap-2 text-muted-foreground'>
                    <ShieldCheck className='size-4 text-primary' />
                    تضمین تازگی و کیفیت گل‌ها
                </Typography>
                <Typography variant='body2' as='div' className='flex items-center gap-2 text-muted-foreground'>
                    <PackageCheck className='size-4 text-primary' />
                    بسته‌بندی ویژه برای حفظ طراوت گل‌ها
                </Typography>
            </div>
        </>
    );
};
