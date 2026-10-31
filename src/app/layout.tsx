import Header from '@/components/ui/shared/header/header';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import { Providers } from '../providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'گل‌نوش | گل‌های تازه برای لحظه‌های خاص',
    description: 'دسته‌گل‌های تازه، گل‌های مناسبتی و گیاهان آپارتمانی را با بسته‌بندی زیبا و ارسال سریع سفارش دهید.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang='fa'
            dir='rtl'
            className={cn('h-full', 'antialiased', geistSans.variable, geistMono.variable, 'font-sans', inter.variable)}
        >
            <Providers>
                <body className='min-h-full' dir='rtl'>
                    <Toaster />
                    {children}
                </body>
            </Providers>
        </html>
    );
}
