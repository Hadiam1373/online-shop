import Link from 'next/link';
import { ArrowLeft, Flower2, Leaf, Sun, Droplets } from 'lucide-react';
import { Typography } from '@/components/ui/typography';

const GUIDES = [
    {
        icon: Droplets,
        title: 'چطور عمر گل شاخه‌بریده را بیشتر کنیم؟',
        text: 'برای ماندگاری بیشتر گل طبیعی، گلدان را تمیز نگه دارید و آب آن را مرتب عوض کنید. پیش از قرار دادن گل در آب، انتهای ساقه را با زاویه برش دهید و برگ‌هایی را که زیر آب می‌مانند جدا کنید. گلدان را دور از تابش مستقیم آفتاب، وسایل گرمایشی و میوه‌های رسیده قرار دهید.',
    },
    {
        icon: Sun,
        title: 'بهترین محل نگهداری گیاه آپارتمانی کجاست؟',
        text: 'نیاز نوری گیاهان آپارتمانی با هم فرق دارد؛ بعضی نور زیاد و غیرمستقیم می‌خواهند و بعضی در نور کمتر هم رشد می‌کنند. قبل از انتخاب گیاه، میزان نور خانه یا محل کار را در نظر بگیرید و آن را متناسب با شرایط فضا انتخاب کنید. آبیاری را هم بر اساس نوع گیاه و خشک‌شدن خاک انجام دهید، نه فقط طبق یک برنامه ثابت.',
    },
    {
        icon: Flower2,
        title: 'برای هدیه، چه دسته‌گلی انتخاب کنیم؟',
        text: 'برای انتخاب دسته‌گل مناسب، به مناسبت، سلیقه فرد و پیامی که می‌خواهید منتقل کنید توجه کنید. رز برای هدیه‌های عاشقانه پرطرفدار است؛ گل‌های رنگارنگ می‌توانند انتخابی شاد برای تبریک و قدردانی باشند. ترکیب رنگ گل‌ها و نوع بسته‌بندی نیز به هماهنگی هدیه با موقعیت کمک می‌کند.',
    },
    {
        icon: Leaf,
        title: 'چطور گیاه مناسب خانه را انتخاب کنیم؟',
        text: 'پیش از خرید گل و گیاه، فضای در دسترس، نور محیط و زمانی را که برای رسیدگی دارید بررسی کنید. اگر تازه نگهداری از گیاهان را شروع کرده‌اید، گونه‌های کم‌نیاز می‌توانند انتخاب ساده‌تری باشند. با انتخاب گلدان متناسب با فضای خانه و توجه به نیاز هر گیاه، محیطی سبز و دلنشین می‌سازید.',
    },
];

export const FlowerKnowledge = () => (
    <section id='flower-knowledge' className='scroll-mt-28 bg-muted/30 py-16 md:py-20' aria-labelledby='flower-knowledge-title'>
        <div className='mx-auto max-w-[1280px] px-4 lg:px-8'>
            <header className='mx-auto mb-10 max-w-2xl text-center'>
                <span className='mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-accent text-primary'>
                    <Leaf className='size-6' aria-hidden='true' />
                </span>
                <Typography
                    id='flower-knowledge-title'
                    as='h2'
                    variant='subtitle1'
                    md-variant='h5'
                    weight='bold'
                    className='text-foreground'
                >
                    دانستنی‌های گل و گیاه
                </Typography>
                <Typography variant='body2' className='mt-3 leading-7 text-muted-foreground'>
                    راهنمای کاربردی انتخاب و نگهداری گل طبیعی و گیاه آپارتمانی؛ برای اینکه هم انتخاب بهتری داشته باشید و هم طراوت گل‌ها و
                    سبزی گیاهان را بیشتر حفظ کنید.
                </Typography>
            </header>

            <div className='grid gap-4 sm:grid-cols-2 lg:gap-5'>
                {GUIDES.map(guide => {
                    const Icon = guide.icon;
                    return (
                        <article key={guide.title} className='rounded-2xl border border-border bg-card p-5 md:p-6'>
                            <span className='mb-4 flex size-10 items-center justify-center rounded-xl bg-accent text-primary'>
                                <Icon className='size-5' aria-hidden='true' />
                            </span>
                            <Typography as='h3' variant='body1' weight='bold' className='text-foreground'>
                                {guide.title}
                            </Typography>
                            <Typography variant='body2' className='mt-2 leading-7 text-muted-foreground'>
                                {guide.text}
                            </Typography>
                        </article>
                    );
                })}
            </div>

            <div className='mt-8 flex flex-wrap justify-center gap-3'>
                <Link
                    href='/products'
                    className='inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90'
                >
                    دیدن گل‌ها و گیاهان
                    <ArrowLeft className='size-4' aria-hidden='true' />
                </Link>
                <Link
                    href='/articles'
                    className='inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary'
                >
                    مطالعه همه مقاله‌ها
                    <ArrowLeft className='size-4' aria-hidden='true' />
                </Link>
            </div>
        </div>
    </section>
);
