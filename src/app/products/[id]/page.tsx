'use client';
import Image from 'next/image';
import { Typography } from '@/components/ui/typography';
import { useGetProduct } from '@/lib/api/products/products.query';
import { useParams } from 'next/dist/client/components/navigation';
import styles from '../products.module.css';
import { useState } from 'react';
import image from 'next/image';
import { Button } from '@/components/ui/button';

const ProductDetail = () => {
    const params = useParams() as { id?: string };
    const id = params?.id || '';
    const { data: product, isLoading } = useGetProduct(id);
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
                        <Typography variant='caption'>
                            {product?.category?.name} / {product?.category?.description}
                        </Typography>
                        <Typography variant='subtitle1' md-variant='h5'>
                            {product?.name}
                        </Typography>
                        <Typography variant='body1'>{product?.description}</Typography>

                        <Typography variant='body1'>ویژگی‌ها</Typography>
                        <div className='grid grid-cols-2 w-md mt-2'>
                            {product?.attributes &&
                                Object.entries(product.attributes).map(([key, value]) => (
                                    <div key={key} className='flex items-center gap-4'>
                                        <Typography weight='bold' variant='body2'>
                                            {key}
                                        </Typography>
                                        <Typography variant='body2'>{value}</Typography>
                                    </div>
                                ))}
                        </div>

                        <div>
                            <Typography variant='body1'>قیمت</Typography>
                            <Typography variant='body2'>{product?.price.toFixed(2)}</Typography>
                            <Button variant='default' size='lg' className='mt-4'>
                                افزودن به سبد خرید
                            </Button>
                        </div>
                    </div>
                    <div>sdfsd</div>
                </div>
            )}
        </div>
    );
};

export default ProductDetail;

const ProductImageGallery = ({ images }: { images: string[] }) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    return (
        <div className={styles['product-image-gallery']}>
            {images[0] && (
                <Image
                    src={selectedImage || images[0]}
                    alt='Product Image'
                    width={250}
                    height={250}
                    className='object-cover rounded-md mx-auto'
                />
            )}

            <div key={images[0].toString()} className={styles['product-image-gallery__item']}>
                {images.map((image, index) => (
                    <Image
                        onClick={() => setSelectedImage(image)}
                        src={image}
                        alt={`Product Image ${index + 1}`}
                        width={100}
                        height={100}
                        className='object-cover rounded-md'
                        key={image.toString()}
                    />
                ))}
            </div>
        </div>
    );
};
