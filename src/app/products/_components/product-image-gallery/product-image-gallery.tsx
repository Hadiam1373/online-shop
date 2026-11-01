'use client';

import Image from 'next/image';
import styles from './product-image-gallery.module.css';
import { useState } from 'react';
import { IProductImageGalleryProps } from './product-image-gallery.dto';
import { getProductImageSrc, handleProductImageError } from '@/lib/utils';

export const ProductImageGallery = ({ images }: IProductImageGalleryProps) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    return (
        <div className={styles['product-image-gallery']}>
            <Image
                src={getProductImageSrc(selectedImage || images[0])}
                alt='تصویر محصول'
                width={250}
                height={250}
                unoptimized
                onError={handleProductImageError}
                className='lg:w-full object-cover rounded-md mx-auto'
            />

            <div className={styles['product-image-gallery__item']}>
                {images.map((image, index) => (
                    <Image
                        onClick={() => setSelectedImage(image)}
                        src={getProductImageSrc(image)}
                        alt={`تصویر محصول ${index + 1}`}
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
