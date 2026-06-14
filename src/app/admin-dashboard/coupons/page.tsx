'use client';
import { HeaderTitle } from '@/components';
import { Button } from '@/components/ui/button';
import styles from '../admin-dashboard.module.css';
import { useRouter } from 'next/navigation';
import { useGetAdminCoupons } from '@/lib/api/admin/admin.query';

export default function CouponsPage() {
    const router = useRouter();
    const { data: coupons, isLoading } = useGetAdminCoupons();

    return (
        <div className={styles['form_wrapper']}>
            <HeaderTitle title='کدهای تخفیف' />
            <div className={styles['form_wrapper--inputs']}>
                <Button onClick={() => router.push('/admin-dashboard/coupons/create')}>ایجاد کوپن</Button>
            </div>

            {isLoading && <p>در حال بارگذاری...</p>}

            {!isLoading && coupons && (
                <div className='mt-4'>
                    <table className='w-full text-right'>
                        <thead>
                            <tr className='text-sm text-muted-foreground'>
                                <th>کد</th>
                                <th>نوع</th>
                                <th>مقدار</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coupons.map(c => (
                                <tr key={c.id} className='border-t'>
                                    <td className='py-2'>{c.code}</td>
                                    <td className='py-2'>{c.discountType}</td>
                                    <td className='py-2'>{c.discountValue}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
