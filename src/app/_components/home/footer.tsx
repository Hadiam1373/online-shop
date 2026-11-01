import Link from 'next/link';
import { Typography } from '@/components/ui/typography';
import { Phone, MapPin, Mail, Flower2 } from 'lucide-react';

const LINKS = [
    { href: '/', label: 'صفحه اصلی' },
    { href: '/products', label: 'گل‌ها و هدیه‌ها' },
    { href: '/cart', label: 'سبد خرید' },
    { href: '/user-dashboard', label: 'حساب کاربری' },
];

export const HomeFooter = () => {
    return (
        <footer className='border-t border-border bg-muted/30'>
            <div className='mx-auto grid max-w-[1280px] grid-cols-1 gap-8 px-4 py-10 sm:grid-cols-3 lg:px-8'>
                <div className='flex flex-col items-start gap-3'>
                    <span className='flex items-center gap-2 text-2xl font-bold text-primary'>
                        <Flower2 className='size-7' />
                        گل‌نوش
                    </span>
                    <Typography variant='body2' className='text-muted-foreground'>
                        گل‌های تازه و چیدمان‌های دست‌ساز برای زیباتر کردن روزهای معمولی و مناسبت‌های خاص.
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
                        ۰۲۱-۱۲۳۴۵۶۷۸
                    </span>
                    <span className='flex items-center gap-2 text-sm text-muted-foreground'>
                        <Mail className='size-4 text-primary' />
                        hello@golnoosh.ir
                    </span>
                    <span className='flex items-center gap-2 text-sm text-muted-foreground'>
                        <MapPin className='size-4 text-primary' />
                        تهران، ایران
                    </span>
                </div>
            </div>

            <div className='border-t border-border py-4 text-center'>
                <Typography variant='caption' className='text-muted-foreground'>
                    © {new Date().getFullYear()} گل‌نوش — با عشق برای لحظه‌های قشنگ
                </Typography>
            </div>
        </footer>
    );
};
