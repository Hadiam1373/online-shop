import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { SyntheticEvent } from 'react';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const FALLBACK_PRODUCT_IMAGE = '/image/hero.webp';

export const getProductImageSrc = (image?: string | null) => {
    const src = image?.trim();
    if (!src) return FALLBACK_PRODUCT_IMAGE;
    if (/^(https?:|data:|blob:|\/)/i.test(src)) return src;
    return `/${src}`;
};

export const handleProductImageError = (event: SyntheticEvent<HTMLImageElement>) => {
    const image = event.currentTarget;
    if (image.src.endsWith(FALLBACK_PRODUCT_IMAGE)) return;
    image.src = FALLBACK_PRODUCT_IMAGE;
};
