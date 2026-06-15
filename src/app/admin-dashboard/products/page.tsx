'use client';
import { HeaderTitle } from '@/components';
import { Button } from '@/components/ui/button';
import styles from '../admin-dashboard.module.css';
import { useRouter } from 'next/navigation';
import { useProductsList } from './products.model';
import { Skeleton } from '@/components/ui/skeleton';
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { BookOpen } from 'lucide-react';
import { Typography } from '@/components/ui/typography';
import { DesktopTable } from '@/components/ui/table/desktop-table';
import { MobileCardTable } from '@/components/ui/table/mobile-table';

export default function ProductsPage() {
    const router = useRouter();
    const { products, isLoading, handleDelete } = useProductsList();

    const currentOrderStatus = (status: string) => {
        switch (status) {
            case 'PENDING':
                return 'در انتظار پرداخت';
            case 'PAID':
                return 'پرداخت شده';
            case 'SHIPED':
                return 'ارسال شده';
            case 'DELIVERED':
                return 'تحویل داده شده';
            case 'CANCELLED':
                return 'لغو شده';
            default:
                return status;
        }
    };

    const rows =
        products?.products?.flatMap(order =>
            products?.products.map(product => ({
                id: product.id,

                fields: [
                    {
                        label: 'نام محصول',
                        value: product.name,
                    },

                    {
                        label: 'قیمت',
                        value: product.price,
                    },

                    {
                        label: 'تعداد',
                        value: product.stock,
                    },

                    {
                        label: 'شناسه محصول',
                        value: currentOrderStatus(product.id),
                    },
                ],

                actions: (
                    <div className='flex gap-4 items-center'>
                        <Button variant='outline' size='sm' onClick={() => router.push(`/admin-dashboard/products/${order.id}`)}>
                            ویرایش
                        </Button>
                        <Button variant='destructive' size='sm' className='mr-2' onClick={() => handleDelete(order.id)}>
                            حذف
                        </Button>
                    </div>
                ),
            })),
        ) ?? [];
    return (
        <div className={styles['form_wrapper']}>
            <HeaderTitle
                title='مدیریت محصولات'
                children={<Button onClick={() => router.push('/admin-dashboard/products/create')}>ایجاد محصول</Button>}
            />

            <DesktopTable
                head={['نام', 'قیمت', 'موجودی', 'شناسه', 'اقدامات']}
                isLoading={isLoading}
                isShowEmptyState={!products?.products?.length}
                body={
                    <tbody>
                        {products?.products?.map(p => (
                            <tr key={p.id + p.name} className='border-t'>
                                <td className='py-2'>{p.name}</td>
                                <td className='py-2'>{p.price}</td>
                                <td className='py-2'>{p.stock}</td>
                                <td className='py-2'>{p.id}</td>
                                <td className='py-2 flex gap-1'>
                                    <Button variant='outline' size='sm' onClick={() => router.push(`/admin-dashboard/products/${p.id}`)}>
                                        ویرایش
                                    </Button>
                                    <Button variant='destructive' size='sm' className='mr-2' onClick={() => handleDelete(p.id)}>
                                        حذف
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                }
            />

            <MobileCardTable
                data={rows}
                loading={isLoading}
                emptyText='سفارشی موجود نیست'
                // page={page}
                // totalPages={orders?.pagination?.pages}
                // onPageChange={setPage}
            />
        </div>
    );
}
