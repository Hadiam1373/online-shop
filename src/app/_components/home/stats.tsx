'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Typography } from '@/components/ui/typography';

const STATS = [
    { value: 12000, suffix: '+', label: 'قطعه موجود در انبار' },
    { value: 8500, suffix: '+', label: 'مشتری راضی' },
    { value: 15, suffix: ' سال', label: 'تجربه در صنعت خودرو' },
    { value: 98, suffix: '٪', label: 'رضایت مشتریان' },
];

const CountUp = ({ value }: { value: number }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.6 });
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if (!inView) return;
        const duration = 1200;
        const start = performance.now();

        let frame: number;
        const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(eased * value));
            if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [inView, value]);

    return <span ref={ref}>{display.toLocaleString('fa')}</span>;
};

export const Stats = () => {
    return (
        <section className='border-b border-border bg-muted/30'>
            <div className='mx-auto grid max-w-[1280px] grid-cols-2 gap-6 px-4 py-12 md:grid-cols-4 lg:px-8'>
                {STATS.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className='flex flex-col items-center gap-1 text-center'
                    >
                        <Typography variant='h6' weight='bold' className='text-primary'>
                            <CountUp value={stat.value} />
                            {stat.suffix}
                        </Typography>
                        <Typography variant='body2' className='text-muted-foreground'>
                            {stat.label}
                        </Typography>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
