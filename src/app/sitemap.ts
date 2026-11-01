import type { MetadataRoute } from 'next';
import { API_BASE_URL, SITE_URL } from '@/lib/seo';

export const revalidate = 3600;

type SitemapProduct = {
    id: string;
    updatedAt?: string;
    images?: unknown;
};

type ProductsResponse = {
    products?: SitemapProduct[];
    pagination?: { pages?: number };
};

type CategoriesResponse = {
    data?: Array<{ id: string }>;
};

const getProducts = async (page: number): Promise<ProductsResponse | null> => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/products?page=${page}&limit=100`, {
            next: { revalidate },
        });
        if (!response.ok) return null;
        return (await response.json()) as ProductsResponse;
    } catch {
        return null;
    }
};

const getCategories = async (): Promise<CategoriesResponse | null> => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/categories?page=1&limit=100`, { next: { revalidate } });
        if (!response.ok) return null;
        return (await response.json()) as CategoriesResponse;
    } catch {
        return null;
    }
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Set NEXT_PUBLIC_SITE_URL to the production origin before deploying.
    if (!SITE_URL) return [];

    const staticPages: MetadataRoute.Sitemap = [
        { url: SITE_URL, changeFrequency: 'weekly', priority: 1 },
        { url: `${SITE_URL}/products`, changeFrequency: 'daily', priority: 0.9 },
        { url: `${SITE_URL}/articles`, changeFrequency: 'weekly', priority: 0.8 },
    ];

    const [firstPage, categoryResponse] = await Promise.all([getProducts(1), getCategories()]);
    const products = [...(firstPage?.products ?? [])];
    const pageCount = Math.min(Math.max(firstPage?.pagination?.pages ?? 1, 1), 100);

    if (pageCount > 1) {
        const otherPages = await Promise.all(Array.from({ length: pageCount - 1 }, (_, index) => getProducts(index + 2)));
        for (const result of otherPages) products.push(...(result?.products ?? []));
    }

    const productPages: MetadataRoute.Sitemap = products.map(product => {
        const images = Array.isArray(product.images)
            ? product.images.filter((image): image is string => typeof image === 'string' && /^https?:\/\//i.test(image))
            : [];

        return {
            url: `${SITE_URL}/products/${encodeURIComponent(product.id)}`,
            ...(product.updatedAt ? { lastModified: new Date(product.updatedAt) } : {}),
            changeFrequency: 'weekly',
            priority: 0.7,
            ...(images.length ? { images } : {}),
        };
    });

    const categoryPages: MetadataRoute.Sitemap = (categoryResponse?.data ?? []).map(category => ({
        url: `${SITE_URL}/products?categoryId=${encodeURIComponent(category.id)}`,
        changeFrequency: 'daily',
        priority: 0.8,
    }));

    return [...staticPages, ...categoryPages, ...productPages];
}
