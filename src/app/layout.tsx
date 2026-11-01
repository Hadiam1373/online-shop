import Header from '@/components/ui/shared/header/header';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import { connection } from 'next/server';
import { Providers } from '../providers';
import { absoluteSiteUrl, METADATA_BASE, SITE_URL } from '@/lib/seo';
import './globals.css';

export const metadata: Metadata = {
    metadataBase: METADATA_BASE,
    title: {
        default: 'گل‌نوش | خرید آنلاین گل، دسته‌گل و گیاه آپارتمانی',
        template: '%s | گل‌نوش',
    },
    description: 'خرید آنلاین گل تازه، دسته‌گل مناسبتی و گیاه آپارتمانی از گل‌نوش؛ انتخاب گل برای هدیه، تولد و مناسبت‌های خاص.',
    applicationName: 'گل‌نوش',
    category: 'فروشگاه گل و گیاه',
    alternates: SITE_URL ? { canonical: absoluteSiteUrl('/') } : undefined,
    openGraph: {
        type: 'website',
        locale: 'fa_IR',
        siteName: 'گل‌نوش',
        title: 'گل‌نوش | خرید آنلاین گل، دسته‌گل و گیاه آپارتمانی',
        description: 'گل تازه، دسته‌گل مناسبتی و گیاه آپارتمانی را آنلاین از گل‌نوش سفارش دهید.',
        ...(SITE_URL ? { url: SITE_URL, images: [{ url: '/image/hero.jpg', alt: 'دسته‌گل تازه گل‌نوش' }] } : {}),
    },
    twitter: {
        card: 'summary_large_image',
        title: 'گل‌نوش | خرید آنلاین گل و گیاه',
        description: 'راهنمای انتخاب و خرید دسته‌گل تازه و گیاه آپارتمانی از گل‌نوش.',
        ...(SITE_URL ? { images: ['/image/hero.jpg'] } : {}),
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
        },
    },
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    await connection();

    return (
        <html lang='fa' dir='rtl' className={cn('h-full', 'antialiased', 'font-sans')}>
            <head>
                <link rel='preload' href='/shared/fonts/anjoman/Anjoman-Regular.ttf' as='font' type='font/ttf' crossOrigin='anonymous' />
                <link rel='preload' href='/shared/fonts/anjoman/Anjoman-Bold.ttf' as='font' type='font/ttf' crossOrigin='anonymous' />
            </head>
            <Providers>
                <body className='min-h-full' dir='rtl'>
                    <Toaster />
                    {SITE_URL && (
                        <script
                            type='application/ld+json'
                            dangerouslySetInnerHTML={{
                                __html: JSON.stringify({
                                    '@context': 'https://schema.org',
                                    '@graph': [
                                        {
                                            '@type': 'Organization',
                                            '@id': `${SITE_URL}/#organization`,
                                            name: 'گل‌نوش',
                                            url: SITE_URL,
                                        },
                                        {
                                            '@type': 'WebSite',
                                            '@id': `${SITE_URL}/#website`,
                                            name: 'گل‌نوش',
                                            url: SITE_URL,
                                            inLanguage: 'fa-IR',
                                            publisher: { '@id': `${SITE_URL}/#organization` },
                                        },
                                    ],
                                }).replace(/</g, '\\u003c'),
                            }}
                        />
                    )}
                    {children}
                </body>
            </Providers>
        </html>
    );
}
