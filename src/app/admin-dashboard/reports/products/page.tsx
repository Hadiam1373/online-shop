'use client';
import React from 'react';
import { HeaderTitle } from '@/components';
import styles from '../../../admin-dashboard.module.css';
import { useGetReportProducts } from '@/lib/api/admin/admin.query';

export default function ProductsReportPage() {
    const { data, isLoading } = useGetReportProducts();

    return (
        <div className={styles['form_wrapper']}>
            <HeaderTitle title='گزارش محصولات' />
            {isLoading && <p>در حال بارگذاری...</p>}
            {!isLoading && data && <pre className='mt-4'>{JSON.stringify(data, null, 2)}</pre>}
        </div>
    );
}
