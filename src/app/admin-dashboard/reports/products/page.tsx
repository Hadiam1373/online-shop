'use client';
import React from 'react';
import { HeaderTitle } from '@/components';
import styles from '../../../admin-dashboard.module.css';
import { useGetReportProducts } from '@/lib/api/admin/admin.query';
import { Spinner } from '@/components/ui/spinner';

export default function ProductsReportPage() {
    const { data, isLoading } = useGetReportProducts();

    return (
        <div className={styles['form_wrapper']}>
            <HeaderTitle title='گزارش محصولات' />
            {isLoading && <Spinner />}
            {!isLoading && data && <pre className='mt-4'>{JSON.stringify(data, null, 2)}</pre>}
        </div>
    );
}
