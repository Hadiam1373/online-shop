import { Typography } from '@/components/ui/typography';

const BRANDS = ['پراید', 'پژو ۲۰۶', 'سمند', 'تیبا', 'دنا', 'رانا', 'L90', 'پژو ۴۰۵', 'تویوتا', 'هیوندای', 'کیا', 'مزدا'];

export const BrandsMarquee = () => {
    const items = [...BRANDS, ...BRANDS];

    return (
        <section className='border-y border-border bg-muted/30 py-8'>
            <Typography variant='caption' className='mb-4 block text-center text-muted-foreground'>
                قطعات متناسب با بیشتر خودروهای داخلی و خارجی
            </Typography>
            <div className='relative overflow-hidden'>
                <div className='flex w-max gap-3 animate-marquee'>
                    {items.map((brand, i) => (
                        <span
                            key={`${brand}-${i}`}
                            className='shrink-0 rounded-full border border-border bg-card px-5 py-2 text-sm font-medium text-foreground'
                        >
                            {brand}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
};
