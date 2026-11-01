import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { IAdminProductResponse } from '@/lib/api/admin/admin.products.dto';
import { motion } from 'motion/react';
import { useRouter } from 'next/dist/client/components/navigation';
import { getProductImageSrc, handleProductImageError } from '@/lib/utils';
import styles from './product-cart.module.css';

interface ProductCartProps {
    products?: IAdminProductResponse[];
}

export const ProductCart = ({ products }: ProductCartProps) => {
    const router = useRouter();
    return (
        <>
            {products?.map((product, index) => {
                const hasDiscount = Boolean(product.discountPrice && product.discountPrice < product.price);
                const discountPercent = hasDiscount ? Math.round(((product.price - product.discountPrice!) / product.price) * 100) : 0;
                const outOfStock = product.stock <= 0;

                return (
                    <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.35, delay: (index % 12) * 0.04 }}
                        whileHover={{ y: -4 }}
                        onClick={() => router.push(`/products/${product.id}`)}
                        className={styles['products__item']}
                        role='button'
                    >
                        <div className='relative'>
                            <img
                                src={getProductImageSrc(product.images?.[0])}
                                alt={product.name}
                                onError={handleProductImageError}
                                className='aspect-square w-full object-cover rounded-xl bg-muted'
                            />

                            {hasDiscount && (
                                <span className='absolute top-2 right-2 rounded-full bg-destructive px-2 py-1 text-xs font-bold text-white shadow-sm'>
                                    {discountPercent.toLocaleString('fa')}٪ تخفیف
                                </span>
                            )}

                            {outOfStock && (
                                <div className='absolute inset-0 flex items-center justify-center rounded-xl bg-background/70'>
                                    <span className='rounded-full bg-foreground/90 px-3 py-1 text-xs font-bold text-background'>
                                        ناموجود
                                    </span>
                                </div>
                            )}
                        </div>

                        <Typography variant='body2' md-variant='body1' weight='bold' className='mt-3 line-clamp-2 min-h-10 text-foreground'>
                            {product.name}
                        </Typography>

                        <div className='mt-1 flex items-center gap-2'>
                            <Typography variant='body1' weight='bold' className='text-primary'>
                                {(hasDiscount ? product.discountPrice! : product.price).toLocaleString('fa')} تومان
                            </Typography>
                            {hasDiscount && (
                                <Typography variant='caption' className='text-muted-foreground line-through'>
                                    {product.price.toLocaleString('fa')}
                                </Typography>
                            )}
                        </div>

                        <Button
                            onClick={e => {
                                e.stopPropagation();
                                router.push(`/products/${product.id}`);
                            }}
                            variant='outline'
                            size='sm'
                            disabled={outOfStock}
                            className='w-full mt-3'
                        >
                            خرید
                        </Button>
                    </motion.div>
                );
            })}
        </>
    );
};
