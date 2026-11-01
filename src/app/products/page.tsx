import type { Metadata } from 'next';
import ProductsListClient from './products-list-client';
import { API_BASE_URL, absoluteSiteUrl } from '@/lib/seo';

type ProductsPageProps = {
    searchParams: Promise<{ categoryId?: string | string[] }>;
};

type CategoryForSeo = {
    id: string;
    name: string;
    description?: string | null;
};

export async function generateMetadata({ searchParams }: ProductsPageProps): Promise<Metadata> {
    const { categoryId } = await searchParams;
    const id = Array.isArray(categoryId) ? categoryId[0] : categoryId;
    if (!id) return {};

    try {
        const response = await fetch(`${API_BASE_URL}/api/categories/${encodeURIComponent(id)}`, {
            next: { revalidate: 3600 },
        });
        if (!response.ok) return { robots: { index: false, follow: true } };

        const category = (await response.json()) as CategoryForSeo;
        const title = `خرید ${category.name}`;
        const description =
            category.description?.trim().slice(0, 160) ||
            `خرید آنلاین ${category.name} تازه از فروشگاه گل‌نوش؛ محصولات این دسته را بررسی و انتخاب کنید.`;
        const canonical = absoluteSiteUrl(`/products?categoryId=${encodeURIComponent(category.id)}`);

        return {
            title,
            description,
            ...(canonical ? { alternates: { canonical } } : {}),
            openGraph: {
                type: 'website',
                title: `${title} | گل‌نوش`,
                description,
                ...(canonical ? { url: canonical } : {}),
            },
        };
    } catch {
        return { robots: { index: false, follow: true } };
    }
}

export default function ProductsPage() {
    return <ProductsListClient />;
}
