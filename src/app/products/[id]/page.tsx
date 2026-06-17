'use client';
import { CommentBox } from '@/app/products/_components/comment-box/comment-box';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { CalendarSync, ShieldCheck } from 'lucide-react';
import { ProductImageGallery, ProductInfo } from '../_components';
import { useProducts } from '../products.model';
import styles from '../products.module.css';
import { ProductBasket } from '../_components/product-basket';

const ProductDetail = () => {
    const { product, isLoading } = useProducts();
    return (
        <div>
            {isLoading ? (
                <p>در حال بارگذاری...</p>
            ) : (
                <div className={styles['product-detail']}>
                    <div className={styles['product-detail__image']}>
                        <ProductImageGallery images={product?.images || []} />
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
};

export default ProductDetail;
