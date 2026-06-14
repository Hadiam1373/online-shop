'use client';
import React from 'react';
import { HeaderTitle } from '@/components';
import styles from '../../../admin-dashboard.module.css';
import { useGetReportCustomers } from '@/lib/api/admin/admin.query';

export default function CustomersReportPage() {
    const { data, isLoading } = useGetReportCustomers();

    return (
        <div className={styles['form_wrapper']}>
            <HeaderTitle title='بینش مشتریان' />
            {isLoading && <p>در حال بارگذاری...</p>}
            {!isLoading && data && <pre className='mt-4'>{JSON.stringify(data, null, 2)}</pre>}
        </div>
    );
}
