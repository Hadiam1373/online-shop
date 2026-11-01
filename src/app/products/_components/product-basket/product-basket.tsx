import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import type { IProduct } from '@/lib/api/products/products.dto';
import { useAddToCart } from '@/lib/api/cart/cart.query';
import { useAddToWishlist } from '@/lib/api/wishlist';
import { useQueryClient } from '@tanstack/react-query';
import { PackageCheck, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

export const ProductBasket = ({ product }: { product: IProduct }) => {
    const queryClient = useQueryClient();
    const { mutateAsync: addToCart } = useAddToCart();
    const { mutateAsync: addToWishlist } = useAddToWishlist();

    const addToCartHandler = async () => {
        try {
            await addToCart({ productId: product.id, quantity: 1 });
            await queryClient.invalidateQueries({ queryKey: ['cart'] });
            toast.success('محصول با موفقیت به سبد خرید شما اضافه شد .');
        } catch {
            toast.error('افزودن محصول به سبد خرید ناموفق بود. دوباره تلاش کنید.');
        }
    };

    const addProductToWishlist = async () => {
        try {
            await addToWishlist({ productId: product.id });
            await queryClient.invalidateQueries({ queryKey: ['wishlist'] });
            toast.success('محصول با موفقیت به لیست مورد علاقه شما اضافه شد .');
        } catch {
            toast.error('افزودن محصول به فهرست علاقه‌مندی‌ها ناموفق بود. دوباره تلاش کنید.');
        }
    };

    return (
        <>
            <div>
                <Typography variant='caption' className='text-muted-foreground'>
                    قیمت محصول
                </Typography>
                <Typography variant='h6' weight='bold' className='text-primary'>
                    {product?.price.toLocaleString('fa')} تومان
                </Typography>

                <Button onClick={addToCartHandler} variant='default' size='lg' className='w-full mt-4'>
                    افزودن به سبد خرید
                </Button>
                <Button onClick={addProductToWishlist} variant='outline' className='mt-2 w-full'>
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
