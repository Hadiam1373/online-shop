import Header from '@/components/ui/shared/header/header';

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Header />
            {children}
        </div>
    );
}
