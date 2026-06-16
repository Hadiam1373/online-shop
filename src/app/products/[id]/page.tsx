'use client';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/ui/typography';
import { useGetProduct } from '@/lib/api/products/products.query';
import { useParams } from 'next/dist/client/components/navigation';
import Image from 'next/image';
import { useState } from 'react';
import styles from '../products.module.css';
import { CalendarSync, ShieldCheck } from 'lucide-react';
import { CommentBox } from '@/app/products/_components/comment-box';

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
                        <div className='grid grid-cols-2 w-xs mt-2 gap-3'>
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
                    <div className={styles['product-detail--price']}>
                        <div>
                            <Typography as='div' className='flex items-center gap-2'>
                                <ShieldCheck />
                                ضمانت اصالت و سلامت کالا
                            </Typography>
                            <Typography as='div' className='flex items-center gap-2 mt-4'>
                                <CalendarSync />
                                بازگشت کالا تا ۷ روز طبق شرایط مرجوعی
                            </Typography>
                        </div>
                        <div>
                            <Typography variant='subtitle1' className='mt-10 text-center'>
                                {product?.price.toLocaleString('fa')} تومان
                            </Typography>

                            <Button variant='default' size='lg' className='w-full mt-4'>
                                افزودن به سبد خرید
                            </Button>
                        </div>
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
