import type { Metadata } from 'next';
import Header from '@/components/ui/shared/header/header';
import { absoluteSiteUrl, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
    title: { default: 'خرید آنلاین گل و گیاه', template: '%s | گل‌نوش' },
    description:
        'خرید آنلاین دسته‌گل تازه، گل مناسبتی و گیاه آپارتمانی از گل‌نوش. محصولات را بر اساس دسته‌بندی، قیمت و موجودی بررسی و انتخاب کنید.',
    ...(SITE_URL ? { alternates: { canonical: absoluteSiteUrl('/products') } } : {}),
    openGraph: {
        type: 'website',
        title: 'خرید آنلاین گل و گیاه | گل‌نوش',
        description: 'انواع دسته‌گل، گل مناسبتی و گیاه آپارتمانی را در فروشگاه آنلاین گل‌نوش ببینید.',
    },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Header />
            {children}
        </div>
    );
}
