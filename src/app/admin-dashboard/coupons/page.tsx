'use client';
import { HeaderTitle } from '@/components';
import { Button } from '@/components/ui/button';
import { DesktopTable } from '@/components/ui/table/desktop-table';
import { MobileCardTable } from '@/components/ui/table/mobile-table';
import styles from '../admin-dashboard.module.css';
import { useRouter } from 'next/navigation';
import { useGetAdminCoupons } from '@/lib/api/admin/admin.query';

export default function CouponsPage() {
    const router = useRouter();
    const { data: coupons, isLoading } = useGetAdminCoupons();

    const rows =
        coupons?.data?.map(coupon => ({
            id: coupon.id,
            fields: [
                { label: 'کد', value: coupon.code },
                { label: 'نوع', value: coupon.discountType },
                { label: 'مقدار', value: coupon.discountValue },
            ],
        })) ?? [];

    return (
        <div className={styles['form_wrapper']}>
            <HeaderTitle
                title='کدهای تخفیف'
                children={<Button onClick={() => router.push('/admin-dashboard/coupons/create')}>ایجاد کوپن</Button>}
            />

            <DesktopTable
                head={['کد', 'نوع', 'مقدار']}
                isLoading={isLoading}
                isShowEmptyState={!coupons?.data?.length}
                body={
                    <tbody>
                        {coupons?.data?.map(c => (
                            <tr key={c.id} className='border-t'>
                                <td className='py-2'>{c.code}</td>
                                <td className='py-2'>{c.discountType}</td>
                                <td className='py-2'>{c.discountValue}</td>
                            </tr>
                        ))}
                    </tbody>
                }
            />

            <MobileCardTable data={rows} loading={isLoading} emptyText='کوپنی موجود نیست' />
        </div>
    );
}
