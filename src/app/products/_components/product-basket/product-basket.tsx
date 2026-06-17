import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { CalendarSync, ShieldCheck } from 'lucide-react';
import { useProducts } from '../../products.model';

export const ProductBasket = () => {
    const { product, addProductToWhishloist } = useProducts();
    return (
        <>
            <div>
                <Typography variant='body2' as='div' className='flex items-center gap-2'>
                    <ShieldCheck />
                    ضمانت اصالت و سلامت کالا
                </Typography>
                <Typography variant='body2' as='div' className='flex items-center gap-2 mt-4'>
                    <CalendarSync />
                    بازگشت کالا تا ۷ روز طبق شرایط مرجوعی
                </Typography>
                <Button onClick={() => addProductToWhishloist()} variant='outline' className='mt-8 w-full'>
                    افزودن به لیست مورد علاقه ها
                </Button>
            </div>
            <div>
                <Typography variant='subtitle1' className='mt-10 text-center'>
                    {product?.price.toLocaleString('fa')} تومان
                </Typography>

                <Button variant='default' size='lg' className='w-full mt-4'>
                    افزودن به سبد خرید
                </Button>
            </div>
        </>
    );
};
