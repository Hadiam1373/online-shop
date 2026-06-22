import Image from 'next/image';
import Link from 'next/link';
import { Typography } from '@/components/ui/typography';
import { Phone, MapPin, Mail } from 'lucide-react';

const LINKS = [
    { href: '/', label: 'صفحه اصلی' },
    { href: '/products', label: 'محصولات' },
    { href: '/cart', label: 'سبد خرید' },
    { href: '/user-dashboard', label: 'حساب کاربری' },
];

export const HomeFooter = () => {
    return (
        <footer className='border-t border-border bg-muted/30'>
            <div className='mx-auto grid max-w-[1280px] grid-cols-1 gap-8 px-4 py-10 sm:grid-cols-3 lg:px-8'>
                <div className='flex flex-col items-start gap-3'>
                    <Image src='/image/logo.webp' alt='نگار بیوتی' width={90} height={90} className='h-10 w-auto object-contain' />
                    <Typography variant='body2' className='text-muted-foreground'>
                        فروشگاه آنلاین لوازم آرایشی و پوست‌شناسی، عرضه‌کننده محصولات اصلی و معتبر برای پوست و آرایش.
                    </Typography>
                </div>

                <div className='flex flex-col gap-2'>
                    <Typography variant='body2' weight='bold' className='text-foreground'>
                        دسترسی سریع
                    </Typography>
                    {LINKS.map(link => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className='text-sm text-muted-foreground transition-colors hover:text-primary'
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                <div className='flex flex-col gap-2'>
                    <Typography variant='body2' weight='bold' className='text-foreground'>
                        ارتباط با ما
                    </Typography>
                    <span className='flex items-center gap-2 text-sm text-muted-foreground'>
                        <Phone className='size-4 text-primary' />
                        ۰۲۱-۹۸۷۶۵۴۳۲
                    </span>
                    <span className='flex items-center gap-2 text-sm text-muted-foreground'>
                        <Mail className='size-4 text-primary' />
                        info@beautyhub.ir
                    </span>
                    <span className='flex items-center gap-2 text-sm text-muted-foreground'>
                        <MapPin className='size-4 text-primary' />
                        تهران، ایران
                    </span>
                </div>
            </div>

            <div className='border-t border-border py-4 text-center'>
                <Typography variant='caption' className='text-muted-foreground'>
                    © {new Date().getFullYear()} نگار بیوتی — تمامی حقوق محفوظ است
                </Typography>
            </div>
        </footer>
    );
};
