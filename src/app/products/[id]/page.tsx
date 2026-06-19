'use client';
import { CommentBox } from '@/app/products/_components/comment-box/comment-box';
import { ProductImageGallery, ProductInfo } from '../_components';
import { ProductBasket } from '../_components/product-basket';
import { useProducts } from '../products.model';
import styles from '../products.module.css';

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
