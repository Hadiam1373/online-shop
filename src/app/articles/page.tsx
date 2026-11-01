import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Flower2, Leaf, Droplets } from 'lucide-react';
import Header from '@/components/ui/shared/header/header';
import { absoluteSiteUrl, SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
    title: 'مقالات گل و گیاه؛ راهنمای نگهداری گل طبیعی و گیاه آپارتمانی',
    description:
        'راهنمای جامع گل‌نوش برای نگهداری گل طبیعی، افزایش ماندگاری گل شاخه‌بریده، انتخاب و مراقبت از گیاهان آپارتمانی و انتخاب دسته‌گل مناسب هدیه.',
    keywords: [
        'مقالات گل و گیاه',
        'نگهداری گل طبیعی',
        'ماندگاری گل شاخه بریده',
        'نگهداری گیاه آپارتمانی',
        'انتخاب دسته گل هدیه',
        'گل مناسب مناسبت‌ها',
    ],
    ...(SITE_URL ? { alternates: { canonical: absoluteSiteUrl('/articles') } } : {}),
    openGraph: {
        title: 'مقالات و راهنمای گل و گیاه | گل‌نوش',
        description: 'راهنمای کاربردی نگهداری گل طبیعی و گیاه آپارتمانی و انتخاب دسته‌گل برای هدیه.',
        locale: 'fa_IR',
        type: 'website',
        ...(SITE_URL ? { url: SITE_URL + '/articles' } : {}),
    },
};

const CONTENTS = [
    { id: 'cut-flower-care', label: 'راهنمای نگهداری گل شاخه‌بریده', icon: Droplets },
    { id: 'houseplant-care', label: 'انتخاب و نگهداری گیاه آپارتمانی', icon: Leaf },
    { id: 'gift-bouquet-guide', label: 'انتخاب دسته‌گل برای هدیه', icon: Flower2 },
];

export default function ArticlesPage() {
    const articleListStructuredData = SITE_URL
        ? {
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              name: 'مقالات و راهنمای گل و گیاه گل‌نوش',
              description: 'راهنماهای انتخاب و نگهداری گل طبیعی و گیاه آپارتمانی.',
              url: absoluteSiteUrl('/articles'),
              inLanguage: 'fa-IR',
              mainEntity: {
                  '@type': 'ItemList',
                  itemListElement: CONTENTS.map((item, index) => ({
                      '@type': 'ListItem',
                      position: index + 1,
                      item: {
                          '@type': 'Article',
                          headline: item.label,
                          url: absoluteSiteUrl(`/articles#${item.id}`),
                      },
                  })),
              },
          }
        : null;

    return (
        <>
            <Header />
            {articleListStructuredData && (
                <script
                    type='application/ld+json'
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(articleListStructuredData).replace(/</g, '\\u003c'),
                    }}
                />
            )}
            <main className='mx-auto flex max-w-[1080px] flex-col gap-8 px-4 py-8 md:gap-10 md:py-12 lg:px-8'>
                <header className='rounded-3xl bg-primary px-6 py-10 text-primary-foreground md:px-10 md:py-14'>
                    <span className='mb-4 inline-flex size-12 items-center justify-center rounded-2xl bg-white/15'>
                        <BookOpen className='size-6' aria-hidden='true' />
                    </span>
                    <h1 className='text-3xl font-bold leading-relaxed md:text-4xl'>مقالات و راهنمای گل و گیاه</h1>
                    <p className='mt-3 max-w-3xl text-sm leading-8 text-primary-foreground/85 md:text-base'>
                        در این راهنماها با روش نگهداری گل طبیعی، نکته‌های مراقبت از گیاهان آپارتمانی و اصول انتخاب دسته‌گل برای هدیه آشنا
                        شوید. مطالب کاربردی گل‌نوش کمک می‌کنند با توجه به شرایط خانه و مناسبت، انتخابی آگاهانه‌تر داشته باشید.
                    </p>
                </header>

                <nav aria-label='فهرست مقالات' className='rounded-2xl border border-border bg-card p-5 md:p-6'>
                    <h2 className='text-lg font-bold text-foreground'>فهرست مقاله‌ها</h2>
                    <ul className='mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3'>
                        {CONTENTS.map(item => {
                            const Icon = item.icon;
                            return (
                                <li key={item.id}>
                                    <a
                                        href={`#${item.id}`}
                                        className='flex h-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-primary'
                                    >
                                        <Icon className='size-4 shrink-0 text-primary' aria-hidden='true' />
                                        {item.label}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <article id='cut-flower-care' className='scroll-mt-28 rounded-3xl border border-border bg-card p-5 md:p-8'>
                    <div className='mb-5 flex items-center gap-3'>
                        <span className='flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent text-primary'>
                            <Droplets className='size-5' aria-hidden='true' />
                        </span>
                        <p className='text-sm font-medium text-muted-foreground'>راهنمای نگهداری گل طبیعی</p>
                    </div>
                    <h2 className='text-2xl font-bold leading-relaxed text-foreground md:text-3xl'>
                        چطور ماندگاری گل شاخه‌بریده را بیشتر کنیم؟
                    </h2>
                    <p className='mt-4 leading-8 text-muted-foreground'>
                        گل شاخه‌بریده با مراقبت درست می‌تواند برای مدت بیشتری شاداب و زیبا بماند. تمیزی گلدان، آب مناسب و محل قرارگیری
                        دسته‌گل از عوامل مهم در حفظ طراوت گل طبیعی هستند. هر گل با توجه به نوع و شرایط نگهداری، دوام متفاوتی دارد؛ بنابراین
                        چند عادت ساده روزانه می‌تواند از پژمردگی زودهنگام جلوگیری کند و زیبایی هدیه را بیشتر نگه دارد.
                    </p>

                    <h3 className='mt-7 text-xl font-bold text-foreground'>۱. گلدان تمیز و آب تازه آماده کنید</h3>
                    <p className='mt-2 leading-8 text-muted-foreground'>
                        پیش از قرار دادن گل‌ها، گلدان را با آب و شوینده ملایم بشویید تا آلودگی و باکتری‌های باقی‌مانده از بین بروند. سپس آن
                        را با آب تمیز و خنک پر کنید. آب گلدان را مرتب بررسی و در صورت کدرشدن تعویض کنید؛ شستن گلدان هنگام تعویض آب نیز به
                        بهداشت بهتر ساقه‌ها کمک می‌کند. اگر گل‌آرای شما محلول نگهدارنده مخصوص گل در اختیارتان گذاشته، آن را مطابق دستور
                        استفاده کنید و مواد خانگی نامطمئن را به آب اضافه نکنید.
                    </p>

                    <h3 className='mt-7 text-xl font-bold text-foreground'>۲. ساقه گل را دوباره برش دهید</h3>
                    <p className='mt-2 leading-8 text-muted-foreground'>
                        انتهای ساقه گل را با ابزار تمیز و تیز، کمی مورب کوتاه کنید تا سطح تازه‌ای برای جذب آب ایجاد شود. برگ‌هایی را که زیر
                        سطح آب قرار می‌گیرند جدا کنید؛ ماندن برگ در آب می‌تواند باعث آلودگی سریع‌تر گلدان شود. برای گل‌هایی با ساقه چوبی یا
                        لطیف، روش آماده‌سازی ممکن است متفاوت باشد، پس بهتر است دستور نگهداری همان نوع گل را در نظر بگیرید.
                    </p>

                    <h3 className='mt-7 text-xl font-bold text-foreground'>۳. جای مناسب برای گلدان انتخاب کنید</h3>
                    <p className='mt-2 leading-8 text-muted-foreground'>
                        گلدان را در محیطی خنک و روشن بگذارید، اما آن را از تابش مستقیم آفتاب، بخاری، شوفاژ و جریان مستقیم باد دور نگه دارید.
                        قرار دادن دسته‌گل کنار میوه‌های رسیده هم مناسب نیست؛ برخی میوه‌ها گازی آزاد می‌کنند که می‌تواند روند پیرشدن گل را
                        سرعت دهد. نور غیرمستقیم و دمای نسبتاً ثابت معمولاً شرایط بهتری برای نگهداری گل فراهم می‌کند.
                    </p>

                    <h3 className='mt-7 text-xl font-bold text-foreground'>چک‌لیست کوتاه مراقبت روزانه</h3>
                    <ul className='mt-3 list-disc space-y-2 pr-6 leading-8 text-muted-foreground marker:text-primary'>
                        <li>هر روز سطح و شفافیت آب گلدان را بررسی کنید.</li>
                        <li>گلبرگ‌های افتاده و برگ‌های پژمرده را از گلدان جدا کنید.</li>
                        <li>گلدان را از منابع گرما و نور مستقیم دور نگه دارید.</li>
                        <li>با دیدن کاهش سطح آب، آن را با آب تازه جایگزین کنید.</li>
                    </ul>
                    <p className='mt-5 leading-8 text-muted-foreground'>
                        این نکته‌ها برای بسیاری از دسته‌گل‌های شاخه‌بریده مفید هستند، اما نیاز گونه‌های مختلف یکسان نیست. برای اینکه هدیه‌ای
                        متناسب با سلیقه و مناسبت پیدا کنید، مجموعه{' '}
                        <Link href='/products' className='font-semibold text-primary underline underline-offset-4'>
                            دسته‌گل‌های گل‌نوش
                        </Link>{' '}
                        را ببینید.
                    </p>
                </article>

                <article id='houseplant-care' className='scroll-mt-28 rounded-3xl border border-border bg-card p-5 md:p-8'>
                    <div className='mb-5 flex items-center gap-3'>
                        <span className='flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent text-primary'>
                            <Leaf className='size-5' aria-hidden='true' />
                        </span>
                        <p className='text-sm font-medium text-muted-foreground'>راهنمای گیاهان آپارتمانی</p>
                    </div>
                    <h2 className='text-2xl font-bold leading-relaxed text-foreground md:text-3xl'>
                        راهنمای انتخاب و نگهداری گیاه آپارتمانی در خانه
                    </h2>
                    <p className='mt-4 leading-8 text-muted-foreground'>
                        گیاه آپارتمانی می‌تواند به فضای خانه یا محل کار رنگ و زندگی بدهد؛ با این حال، انتخاب گیاه باید بر اساس شرایط واقعی
                        محیط انجام شود. مقدار نور، دمای اتاق، فضای موجود و زمانی که برای رسیدگی در اختیار دارید، همگی در سلامت گیاه نقش
                        دارند. پیش از خرید گیاه، محل قرارگیری گلدان را مشخص کنید تا بتوانید گونه‌ای متناسب با نور و برنامه روزانه خود انتخاب
                        کنید.
                    </p>

                    <h3 className='mt-7 text-xl font-bold text-foreground'>نور محیط را پیش از خرید بررسی کنید</h3>
                    <p className='mt-2 leading-8 text-muted-foreground'>
                        نور کنار پنجره جنوبی با نور یک راهرو یا اتاق کم‌نور یکسان نیست. بعضی گیاهان نور روشن و غیرمستقیم را ترجیح می‌دهند و
                        برخی گونه‌ها با نور کمتر سازگارترند. برگ‌های گیاه را برای مدت طولانی در معرض آفتاب تند پشت شیشه قرار ندهید، مگر
                        اینکه نیاز همان گونه چنین باشد. اگر نور خانه محدود است، درباره گیاهان سازگار با نور کم پرس‌وجو کنید و گلدان را هر
                        چند وقت یک‌بار از نظر رشد و رنگ برگ‌ها بررسی کنید.
                    </p>

                    <h3 className='mt-7 text-xl font-bold text-foreground'>آبیاری گیاه را با نیاز آن هماهنگ کنید</h3>
                    <p className='mt-2 leading-8 text-muted-foreground'>
                        آبیاری بیش از اندازه یکی از علت‌های رایج آسیب‌دیدن گیاهان آپارتمانی است. به جای آب‌دادن طبق یک برنامه ثابت برای همه
                        گلدان‌ها، رطوبت خاک و نیاز گونه گیاه را بررسی کنید. نوع خاک، اندازه گلدان، فصل و میزان نور روی سرعت خشک‌شدن خاک اثر
                        می‌گذارند. گلدانی انتخاب کنید که سوراخ زهکشی داشته باشد و آب اضافی بتواند از آن خارج شود؛ ماندن طولانی آب در
                        زیرگلدانی نیز برای بسیاری از گیاهان مناسب نیست.
                    </p>

                    <h3 className='mt-7 text-xl font-bold text-foreground'>خاک، گلدان و نظافت برگ‌ها</h3>
                    <p className='mt-2 leading-8 text-muted-foreground'>
                        خاک مناسب باید با نیاز گیاه هماهنگ باشد و بتواند آب و هوا را به ریشه برساند. هنگام تعویض گلدان، ظرفی متناسب با
                        اندازه ریشه انتخاب کنید؛ گلدان بسیار بزرگ می‌تواند خشک‌شدن خاک را طولانی کند. گردوغبار روی برگ‌ها را با روش مناسب
                        همان گیاه پاک کنید تا برگ‌ها تمیز بمانند. برگ‌های زرد یا خشک را نیز جدا کنید و گیاه را از نظر آفت یا تغییر غیرعادی
                        در ظاهر بررسی کنید.
                    </p>

                    <h3 className='mt-7 text-xl font-bold text-foreground'>برای شروع، گیاه متناسب با سبک زندگی‌تان بخرید</h3>
                    <p className='mt-2 leading-8 text-muted-foreground'>
                        اگر زمان کمی برای رسیدگی دارید، سراغ گیاهی بروید که نیازهای نگهداری آن با برنامه شما سازگار باشد؛ اگر فضای خانه
                        نورگیر است، گزینه‌های بیشتری در دسترس خواهید داشت. نام گیاه و راهنمای مراقبت از آن را نگه دارید و تغییرات برگ و خاک
                        را در چند هفته اول دنبال کنید. برای دیدن{' '}
                        <Link href='/products' className='font-semibold text-primary underline underline-offset-4'>
                            گیاهان آپارتمانی و گل‌های مناسب خانه
                        </Link>{' '}
                        می‌توانید محصولات فروشگاه گل‌نوش را بررسی کنید.
                    </p>
                </article>

                <article id='gift-bouquet-guide' className='scroll-mt-28 rounded-3xl border border-border bg-card p-5 md:p-8'>
                    <div className='mb-5 flex items-center gap-3'>
                        <span className='flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent text-primary'>
                            <Flower2 className='size-5' aria-hidden='true' />
                        </span>
                        <p className='text-sm font-medium text-muted-foreground'>راهنمای خرید گل هدیه</p>
                    </div>
                    <h2 className='text-2xl font-bold leading-relaxed text-foreground md:text-3xl'>
                        چطور برای هر مناسبت دسته‌گل مناسب انتخاب کنیم؟
                    </h2>
                    <p className='mt-4 leading-8 text-muted-foreground'>
                        انتخاب دسته‌گل هدیه فقط به رنگ و قیمت محدود نمی‌شود. مناسبت، رابطه شما با هدیه‌گیرنده، سلیقه او و شیوه تحویل، همگی
                        در انتخاب گل مناسب اثر دارند. برای خرید آنلاین گل، ابتدا مشخص کنید هدیه قرار است چه حسی منتقل کند: عشق، قدردانی،
                        تبریک یا همدلی. سپس نوع گل، ترکیب رنگ و اندازه دسته‌گل را متناسب با همان پیام انتخاب کنید.
                    </p>

                    <h3 className='mt-7 text-xl font-bold text-foreground'>گل مناسب تولد و تبریک</h3>
                    <p className='mt-2 leading-8 text-muted-foreground'>
                        برای تولد یا تبریک یک موفقیت، ترکیب‌های رنگی شاد و گل‌هایی با ظاهر پرانرژی می‌توانند حس جشن و خوشحالی را منتقل کنند.
                        ژربرا و آفتابگردان از نمونه‌هایی هستند که در چیدمان‌های رنگارنگ دیده می‌شوند؛ انتخاب نهایی را با توجه به رنگ‌های
                        مورد علاقه فرد انجام دهید. اگر از سلیقه او مطمئن نیستید، یک دسته‌گل متعادل با ترکیب چند رنگ هماهنگ معمولاً انتخابی
                        دوستانه و مناسب است.
                    </p>

                    <h3 className='mt-7 text-xl font-bold text-foreground'>انتخاب گل برای سالگرد و مناسبت عاشقانه</h3>
                    <p className='mt-2 leading-8 text-muted-foreground'>
                        رز قرمز در فرهنگ هدیه‌دادن نمادی شناخته‌شده از عشق است و رز صورتی می‌تواند حس لطافت و قدردانی را منتقل کند. با این
                        حال، لازم نیست انتخاب شما به یک رنگ محدود باشد؛ رنگ مورد علاقه مخاطب یا ترکیب گل‌های فصلی هم می‌تواند هدیه‌ای
                        شخصی‌تر بسازد. کارت پیام کوتاه و صمیمانه را فراموش نکنید؛ گاهی چند کلمه از انتخاب پرهزینه گل هم به‌یادماندنی‌تر
                        می‌شود.
                    </p>

                    <h3 className='mt-7 text-xl font-bold text-foreground'>گل برای تشکر، دیدار و هدیه رسمی</h3>
                    <p className='mt-2 leading-8 text-muted-foreground'>
                        برای تشکر یا دیدار رسمی، چیدمانی ساده و متناسب با فضای دریافت هدیه انتخاب کنید. رنگ‌های ملایم و طراحی مرتب برای
                        بسیاری از این موقعیت‌ها مناسب‌اند. اگر قرار است گل به محل کار یا خانه فرستاده شود، اندازه دسته‌گل و امکان قرار دادن
                        آن در گلدان را در نظر بگیرید. بسته‌بندی کاربردی و پیام محترمانه، هدیه را کامل‌تر می‌کند.
                    </p>

                    <h3 className='mt-7 text-xl font-bold text-foreground'>پیش از ثبت سفارش آنلاین گل چه چیزهایی را بررسی کنیم؟</h3>
                    <ul className='mt-3 list-disc space-y-2 pr-6 leading-8 text-muted-foreground marker:text-primary'>
                        <li>تاریخ و بازه زمانی موردنظر برای تحویل را بررسی کنید.</li>
                        <li>ترکیب گل، رنگ و اندازه محصول را با مناسبت و سلیقه مخاطب بسنجید.</li>
                        <li>توضیحات محصول و شرایط آماده‌سازی گل فصلی را بخوانید.</li>
                        <li>آدرس و شماره تماس گیرنده را هنگام ثبت سفارش دقیق وارد کنید.</li>
                    </ul>
                    <p className='mt-5 leading-8 text-muted-foreground'>
                        با توجه به این نکته‌ها، انتخاب گل برای تولد، سالگرد، تبریک یا تشکر ساده‌تر می‌شود. برای یافتن هدیه‌ای متناسب با
                        مناسبت،{' '}
                        <Link href='/products' className='font-semibold text-primary underline underline-offset-4'>
                            مجموعه گل و دسته‌گل‌های گل‌نوش
                        </Link>{' '}
                        را ببینید.
                    </p>
                </article>

                <aside className='flex flex-col items-start justify-between gap-4 rounded-2xl bg-accent/60 p-5 sm:flex-row sm:items-center md:p-6'>
                    <div>
                        <h2 className='text-lg font-bold text-foreground'>برای انتخاب گل مناسب آماده‌اید؟</h2>
                        <p className='mt-1 text-sm leading-7 text-muted-foreground'>
                            دسته‌گل‌ها و گیاهان گل‌نوش را برای هدیه یا خانه بررسی کنید.
                        </p>
                    </div>
                    <Link
                        href='/products'
                        className='inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90'
                    >
                        مشاهده محصولات
                        <ArrowLeft className='size-4' aria-hidden='true' />
                    </Link>
                </aside>
            </main>
        </>
    );
}
