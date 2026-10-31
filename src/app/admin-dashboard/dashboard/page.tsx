'use client';
import React from 'react';
import { HeaderTitle } from '@/components';
import styles from '../admin-dashboard.module.css';
import { useGetDashboardStats } from '@/lib/api/admin/admin.query';
import { Spinner } from '@/components/ui/spinner';
import { Typography } from '@/components/ui/typography';
import { BarChart3 } from 'lucide-react';

const formatValue = (value: unknown) => {
    if (typeof value === 'number') return value.toLocaleString('fa');
    if (typeof value === 'object' && value !== null) return JSON.stringify(value, null, 2);
    return String(value);
};

export default function AdminDashboardStats() {
    const { data, isLoading } = useGetDashboardStats();

    return (
        <div className={styles['form_wrapper']}>
            <HeaderTitle title='آمار کلی پنل ادمین' />
            {isLoading && <Spinner />}
            {!isLoading && data && (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {Object.entries(data).map(([k, v]) => (
                        <div key={k} className='flex items-start gap-4 rounded-2xl border border-border bg-card p-5'>
                            <span className='flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent text-primary'>
                                <BarChart3 className='size-5' />
                            </span>
                            <div className='min-w-0'>
                                <Typography variant='body2' className='text-muted-foreground'>
                                    {k}
                                </Typography>
                                <Typography variant='subtitle2' weight='bold' className='mt-1 wrap-break-word text-foreground'>
                                    {formatValue(v)}
                                </Typography>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
