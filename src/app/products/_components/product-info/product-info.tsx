import { Typography } from '@/components/ui/typography';
import styles from './product-info.module.css';
import { useProducts } from '../../products.model';

export const ProductInfo = () => {
    const { product } = useProducts();
    return (
        <div className={styles['product-detail__info']}>
            <Typography variant='caption' className='text-muted-foreground'>
                {product?.category?.name} / {product?.category?.description}
            </Typography>
            <Typography as='h1' variant='subtitle1' md-variant='h6' weight='bold' className='text-foreground'>
                {product?.name}
            </Typography>
            <Typography variant='body1' className='text-muted-foreground'>
                {product?.description}
            </Typography>
            {product?.attributes && Object.keys(product.attributes).length > 0 && (
                <>
                    <Typography variant='body1' weight='bold' className='mt-2 text-foreground'>
                        ویژگی‌ها
                    </Typography>
                    <div className='flex flex-wrap items-center gap-2'>
                        {Object.entries(product.attributes).map(([key, value]) => (
                            <div key={key} className={styles['product-detail__info--property']}>
                                <Typography weight='bold' variant='body2'>
                                    {key}:
                                </Typography>
                                <Typography variant='body2' className='text-muted-foreground'>
                                    {value}
                                </Typography>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};
