'use client';
import { HeaderTitle } from '@/components';
import styles from './admin-dashboard.module.css';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
    const router = useRouter();
    return (
        <div className={styles['form_wrapper']}>
            <HeaderTitle title='پنل مدیریت' />
            <div className={styles['form_wrapper--inputs']}>
                <Button variant='outline' onClick={() => router.push('/admin-dashboard/products')}>
                    مدیریت محصولات
                </Button>
                <Button variant='outline' onClick={() => router.push('/admin-dashboard/categories')}>
                    دسته‌بندی‌ها
                </Button>
                <Button variant='outline' onClick={() => router.push('/admin-dashboard/coupons')}>
                    کدهای تخفیف
                </Button>
                <Button variant='outline' onClick={() => router.push('/admin-dashboard/orders')}>
                    سفارشات
                </Button>
                <Button variant='outline' onClick={() => router.push('/admin-dashboard/payments')}>
                    پرداخت‌ها
                </Button>
                <Button variant='outline' onClick={() => router.push('/admin-dashboard/reviews')}>
                    نظرات
                </Button>
                <Button variant='outline' onClick={() => router.push('/admin-dashboard/users')}>
                    کاربران و گزارش‌ها
                </Button>
            </div>
        </div>
    );
}
