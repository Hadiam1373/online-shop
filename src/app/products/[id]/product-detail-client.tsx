'use client';

import { CommentBox } from '@/app/products/_components/comment-box/comment-box';
import { ProductImageGallery, ProductInfo } from '../_components';
import { ProductBasket } from '../_components/product-basket';
import { useProducts } from '../products.model';
import styles from '../products.module.css';
import { Spinner } from '@/components/ui/spinner';

export default function ProductDetailClient() {
    const { product, isLoading } = useProducts();

    return (
        <div>
            {isLoading ? (
                <Spinner />
            ) : (
                <div className={styles['product-detail']}>
                    <div className={styles['product-detail__image']}>
                        <ProductImageGallery images={product?.images || []} productName={product?.name} />
                    </div>
                    <div className={styles['product-detail__info']}>
                        <ProductInfo />
                    </div>
                    <div className={styles['product-detail--price']}>
                        <ProductBasket />
                    </div>
                    <div className={styles['product-detail--comments']}>
                        <CommentBox />
                    </div>
                </div>
            )}
        </div>
    );
}
