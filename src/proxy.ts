import { NextRequest, NextResponse } from 'next/server';

const getApiOrigin = () => {
    try {
        return new URL(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').origin;
    } catch {
        return 'http://localhost:5000';
    }
};

export function proxy(request: NextRequest) {
    const nonce = btoa(crypto.randomUUID());
    const isDevelopment = process.env.NODE_ENV === 'development';
    const isHttpsDeployment = process.env.NEXT_PUBLIC_SITE_URL?.startsWith('https://') ?? false;
    const apiOrigin = getApiOrigin();
    const csp = [
        "default-src 'self'",
        `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDevelopment ? " 'unsafe-eval'" : ''}`,
        "style-src 'self' 'unsafe-inline'",
        `img-src 'self' ${apiOrigin} https: data: blob:`,
        "font-src 'self' data:",
        `connect-src 'self' ${apiOrigin}${isDevelopment ? ' ws: wss:' : ''}`,
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self' https:",
        "frame-ancestors 'none'",
        ...(isHttpsDeployment ? ['upgrade-insecure-requests'] : []),
    ].join('; ');

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-nonce', nonce);
    requestHeaders.set('Content-Security-Policy', csp);

    const response = NextResponse.next({ request: { headers: requestHeaders } });
    response.headers.set('Content-Security-Policy', csp);
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
    response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    if (isHttpsDeployment) {
        response.headers.set('Strict-Transport-Security', 'max-age=15552000');
    }

    return response;
}

export const config = {
    matcher: [
        {
            source: '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
            missing: [
                { type: 'header', key: 'next-router-prefetch' },
                { type: 'header', key: 'purpose', value: 'prefetch' },
            ],
        },
    ],
};
