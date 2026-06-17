import { Typography } from '@/components/ui/typography';
import { useProducts } from '../../products.model';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/dist/client/components/navigation';
import styles from './product-cart.module.css';

export const ProductCart = () => {
    const { products } = useProducts();
    const router = useRouter();
    return (
        <>
            {products?.products?.map(product => (
                <div key={product.id} className={styles['products__item']}>
                    {product.images?.length > 0 ? (
                        <img src={product.images[0]} alt={product.name} className='size-48 object-cover rounded-full mx-auto' />
                    ) : (
                        <div className='w-full h-48 bg-gray-200 rounded-md' />
                    )}
                    <div className='flex items-center justify-between mt-8 h-12'>
                        <Typography variant='body1' weight='bold'>
                            {product.name}
                        </Typography>
                    </div>

                    <div className='flex items-center justify-between mt-4'>
                        <Typography variant='body1'>قیمت</Typography>
                        <Typography variant='body2'>{product.price.toLocaleString('fa')} تومان</Typography>
                    </div>

                    <Button onClick={() => router.push(`/products/${product.id}`)} variant='outline' size='sm' className='w-full mt-4'>
                        مشاهده جزئیات
                    </Button>
                </div>
            ))}
        </>
    );
};
