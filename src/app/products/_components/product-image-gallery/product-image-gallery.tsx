'use client';

import Image from 'next/image';
import styles from './product-image-gallery.module.css';
import { useState } from 'react';
import { IProductImageGalleryProps } from './product-image-gallery.dto';
import { getProductImageSrc, handleProductImageError } from '@/lib/utils';

export const ProductImageGallery = ({ images, productName = 'محصول گل‌نوش' }: IProductImageGalleryProps) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    return (
        <div className={styles['product-image-gallery']}>
            <Image
                src={getProductImageSrc(selectedImage || images[0])}
                alt={`${productName} - تصویر محصول`}
                width={750}
                height={1000}
                sizes='(min-width: 1024px) 33vw, 100vw'
                priority
                unoptimized
                onError={handleProductImageError}
                className='h-auto w-full object-cover rounded-md mx-auto'
            />

            <div className={styles['product-image-gallery__item']}>
                {images.map((image, index) => (
                    <Image
                        onClick={() => setSelectedImage(image)}
                        src={getProductImageSrc(image)}
                        alt={`${productName} - تصویر ${index + 1}`}
                        width={100}
                        height={100}
                        unoptimized
                        onError={handleProductImageError}
                        className='object-cover rounded-md'
                        key={`product-image-thumb-${index}`}
                    />
                ))}
            </div>
        </div>
    );
};
