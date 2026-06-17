import { Typography } from '@/components/ui/typography';
import styles from './product-info.module.css';
import { useProducts } from '../../products.model';

export const ProductInfo = () => {
    const { product } = useProducts();
    return (
        <div className={styles['product-detail__info']}>
            <Typography variant='caption'>
                {product?.category?.name} / {product?.category?.description}
            </Typography>
            <Typography variant='subtitle1' md-variant='h6'>
                {product?.name}
            </Typography>
            <Typography variant='body1'>{product?.description}</Typography>
            <Typography variant='body1'>ویژگی‌ها</Typography>
            <div className='flex flex-wrap items-center mt-2 gap-3'>
                {product?.attributes &&
                    Object.entries(product.attributes).map(([key, value]) => (
                        <div key={key} className={styles['product-detail__info--property']}>
                            <Typography weight='bold' variant='body2'>
                                {key}:
                            </Typography>
                            <Typography variant='body2'>{value}</Typography>
                        </div>
                    ))}
            </div>
        </div>
    );
};
