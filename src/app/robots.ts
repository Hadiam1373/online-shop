import type { MetadataRoute } from 'next';
import { absoluteSiteUrl } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
    const sitemapUrl = absoluteSiteUrl('/sitemap.xml');

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin-dashboard', '/user-dashboard'],
        },
        ...(sitemapUrl ? { sitemap: sitemapUrl } : {}),
    };
}
