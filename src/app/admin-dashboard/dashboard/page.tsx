'use client';
import React from 'react';
import { HeaderTitle } from '@/components';
import styles from '../../admin-dashboard.module.css';
import { useGetDashboardStats } from '@/lib/api/admin/admin.query';

export default function AdminDashboardStats() {
    const { data, isLoading } = useGetDashboardStats();

    return (
        <div className={styles['form_wrapper']}>
            <HeaderTitle title='آمار کلی پنل ادمین' />
            {isLoading && <p>در حال بارگذاری...</p>}
            {!isLoading && data && (
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    {Object.entries(data).map(([k, v]) => (
                        <div key={k} className='p-4 border rounded'>
                            <h4 className='font-semibold'>{k}</h4>
                            <p>{JSON.stringify(v)}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
