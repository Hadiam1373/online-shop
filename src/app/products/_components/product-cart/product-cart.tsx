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
                <div
                    key={product.id}
                    onClick={() => router.push(`/products/${product.id}`)}
                    className={styles['products__item']}
                    role='button'
                >
                    {product.images?.length > 0 ? (
                        <img
                            src={product.images[0]}
                            alt={product.name}
                            className='aspect-square w-full object-cover rounded-xl bg-muted'
                        />
                    ) : (
                        <div className='aspect-square w-full bg-muted rounded-xl' />
                    )}

                    <Typography variant='body2' md-variant='body1' weight='bold' className='mt-3 line-clamp-2 min-h-10 text-foreground'>
                        {product.name}
                    </Typography>

                    <Typography variant='body1' weight='bold' className='mt-1 text-primary'>
                        {product.price.toLocaleString('fa')} تومان
                    </Typography>

                    <Button
                        onClick={e => {
                            e.stopPropagation();
                            router.push(`/products/${product.id}`);
                        }}
                        variant='outline'
                        size='sm'
                        className='w-full mt-3'
                    >
                        مشاهده جزئیات
                    </Button>
                </div>
            ))}
        </>
    );
};
