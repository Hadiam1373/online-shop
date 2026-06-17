'use client';

import Image from 'next/image';
import styles from './product-image-gallery.module.css';
import { useState } from 'react';
import { IProductImageGalleryProps } from './product-image-gallery.dto';

export const ProductImageGallery = ({ images }: IProductImageGalleryProps) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    return (
        <div className={styles['product-image-gallery']}>
            {images[0] && (
                <Image
                    src={selectedImage || images[0]}
                    alt='Product Image'
                    width={250}
                    height={250}
                    className='lg:w-full object-cover rounded-md mx-auto'
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
