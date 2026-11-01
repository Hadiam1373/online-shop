import type { Metadata } from 'next';
import Header from '@/components/ui/shared/header/header';

export const metadata: Metadata = {
    title: 'سبد خرید',
    robots: { index: false, follow: false },
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Header />
            {children}
        </div>
    );
}
