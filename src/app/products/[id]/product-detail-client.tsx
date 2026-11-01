'use client';

import { CommentBox } from '@/app/products/_components/comment-box/comment-box';
import { ProductImageGallery, ProductInfo } from '../_components';
import { ProductBasket } from '../_components/product-basket';
import { useGetProduct } from '@/lib/api/products/products.query';
import type { IProduct } from '@/lib/api/products/products.dto';
import { useParams } from 'next/navigation';
import styles from '../products.module.css';
import { Spinner } from '@/components/ui/spinner';

export default function ProductDetailClient({ initialProduct }: { initialProduct: IProduct | null }) {
    const params = useParams() as { id?: string };
    const id = params?.id || initialProduct?.id || '';
    const { data: product, isLoading } = useGetProduct(id, {
        queryOptions: {
            initialData: initialProduct ?? undefined,
            staleTime: 5 * 60 * 1000,
        },
    });

    return (
        <div>
            {isLoading ? (
                <Spinner />
            ) : (
                <div className={styles['product-detail']}>
                    <div className={styles['product-detail__image']}>
                        <ProductImageGallery images={product?.images || []} productName={product?.name} />
                    </div>
                    <div className={styles['product-detail__info']}>{product && <ProductInfo product={product} />}</div>
                    <div className={styles['product-detail--price']}>{product && <ProductBasket product={product} />}</div>
                    <div className={styles['product-detail--comments']}>
                        <CommentBox />
                    </div>
                </div>
            )}
        </div>
    );
}
