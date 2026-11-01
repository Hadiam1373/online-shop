import type { Metadata } from 'next';
import { API_BASE_URL, absoluteSiteUrl, SITE_URL } from '@/lib/seo';
import type { IProduct } from '@/lib/api/products/products.dto';
import ProductDetailClient from './product-detail-client';

type ProductPageProps = {
    params: Promise<{ id: string }>;
};

const getProductForSeo = async (id: string): Promise<IProduct | null> => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/products/${encodeURIComponent(id)}`, {
            next: { revalidate: 600 },
        });
        if (!response.ok) return null;
        return (await response.json()) as IProduct;
    } catch {
        return null;
    }
};

const getProductImageUrls = (images: string[] = []) =>
    images
        .filter(image => /^https?:\/\//i.test(image) || (SITE_URL && image.startsWith('/')))
        .map(image => (image.startsWith('/') ? absoluteSiteUrl(image) : image))
        .filter((image): image is string => Boolean(image));

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
    const { id } = await params;
    const product = await getProductForSeo(id);

    if (!product) {
        return {
            title: 'جزئیات محصول',
            description: 'مشاهده جزئیات و مشخصات محصولات گل‌نوش.',
            robots: { index: false, follow: true },
        };
    }

    const description =
        product.description?.trim().slice(0, 160) ||
        `مشاهده مشخصات ${product.name}${product.category?.name ? ` در دسته ${product.category.name}` : ''} و ثبت سفارش از فروشگاه گل‌نوش.`;
    const images = getProductImageUrls(product.images);
    const canonical = absoluteSiteUrl(`/products/${encodeURIComponent(product.id)}`);

    return {
        title: product.name,
        description,
        ...(canonical ? { alternates: { canonical } } : {}),
        openGraph: {
            type: 'website',
            title: product.name,
            description,
            ...(canonical ? { url: canonical } : {}),
            ...(images.length ? { images } : {}),
        },
        twitter: {
            card: images.length ? 'summary_large_image' : 'summary',
            title: product.name,
            description,
            ...(images.length ? { images } : {}),
        },
    };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
    const { id } = await params;
    const product = await getProductForSeo(id);

    const productUrl = absoluteSiteUrl(`/products/${encodeURIComponent(id)}`);
    const productImages = product ? getProductImageUrls(product.images) : [];
    const structuredData =
        product && productUrl
            ? {
                  '@context': 'https://schema.org',
                  '@graph': [
                      {
                          '@type': 'Product',
                          name: product.name,
                          description: product.description || undefined,
                          image: productImages.length ? productImages : undefined,
                          category: product.category?.name || undefined,
                          url: productUrl,
                          brand: { '@type': 'Brand', name: 'گل‌نوش' },
                          ...(Number.isFinite(product.price)
                              ? {
                                    offers: {
                                        '@type': 'Offer',
                                        url: productUrl,
                                        priceCurrency: 'IRR',
                                        price: String(Math.round(product.price * 10)),
                                        availability: `https://schema.org/${product.stock > 0 ? 'InStock' : 'OutOfStock'}`,
                                        itemCondition: 'https://schema.org/NewCondition',
                                    },
                                }
                              : {}),
                      },
                      {
                          '@type': 'BreadcrumbList',
                          itemListElement: [
                              { '@type': 'ListItem', position: 1, name: 'صفحه اصلی', item: absoluteSiteUrl('/') },
                              { '@type': 'ListItem', position: 2, name: 'گل‌ها و هدیه‌ها', item: absoluteSiteUrl('/products') },
                              ...(product.category
                                  ? [
                                        {
                                            '@type': 'ListItem',
                                            position: 3,
                                            name: product.category.name,
                                            item: product.categoryId
                                                ? absoluteSiteUrl(`/products?categoryId=${encodeURIComponent(product.categoryId)}`)
                                                : productUrl,
                                        },
                                    ]
                                  : []),
                              {
                                  '@type': 'ListItem',
                                  position: product.category ? 4 : 3,
                                  name: product.name,
                                  item: productUrl,
                              },
                          ],
                      },
                  ],
              }
            : null;

    return (
        <>
            {structuredData && (
                <script
                    type='application/ld+json'
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
                />
            )}
            <ProductDetailClient key={id} initialProduct={product} />
        </>
    );
}
