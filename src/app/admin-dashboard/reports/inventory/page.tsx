'use client';
import React from 'react';
import { HeaderTitle } from '@/components';
import styles from '../../admin-dashboard.module.css';
import { useGetReportInventory } from '@/lib/api/admin/admin.query';
import { Spinner } from '@/components/ui/spinner';

export default function InventoryReportPage() {
    const { data, isLoading } = useGetReportInventory();

    return (
        <div className={styles['form_wrapper']}>
            <HeaderTitle title='گزارش موجودی' />
            {isLoading && <Spinner />}
            {!isLoading && data && (
                <pre className='rounded-2xl border border-border bg-muted/30 p-4 font-mono text-sm overflow-auto'>
                    {JSON.stringify(data, null, 2)}
                </pre>
            )}
        </div>
    );
}
