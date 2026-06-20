'use client';
import React from 'react';
import { HeaderTitle } from '@/components';
import styles from '../../../admin-dashboard.module.css';
import { useGetReportSales } from '@/lib/api/admin/admin.query';
import { Spinner } from '@/components/ui/spinner';

export default function SalesReportPage() {
    const { data, isLoading } = useGetReportSales();

    return (
        <div className={styles['form_wrapper']}>
            <HeaderTitle title='گزارش فروش' />
            {isLoading && <Spinner />}
            {!isLoading && data && <pre className='mt-4'>{JSON.stringify(data, null, 2)}</pre>}
        </div>
    );
}
