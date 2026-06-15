'use client';
import { HeaderTitle } from '@/components';
import { Button } from '@/components/ui/button';
import { DesktopTable } from '@/components/ui/table/desktop-table';
import { MobileCardTable } from '@/components/ui/table/mobile-table';
import { useRouter } from 'next/navigation';
import styles from '../admin-dashboard.module.css';
import { useProductsList } from './products.model';

export default function ProductsPage() {
    const router = useRouter();
    const { products, isLoading, handleDelete } = useProductsList();

    const rows =
        products?.products?.map(product => ({
            id: product.id,
            fields: [
                { label: 'نام محصول', value: product.name },
                { label: 'قیمت', value: product.price },
                { label: 'موجودی', value: product.stock },
                { label: 'شناسه محصول', value: product.id },
            ],
            actions: (
                <div className='flex gap-4 items-center'>
                    <Button variant='outline' size='sm' onClick={() => router.push(`/admin-dashboard/products/${product.id}`)}>
                        ویرایش
                    </Button>
                    <Button variant='destructive' size='sm' className='mr-2' onClick={() => handleDelete(product.id)}>
                        حذف
                    </Button>
                </div>
            ),
        })) ?? [];

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
                            <tr key={p.id} className='border-t'>
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

            <MobileCardTable data={rows} loading={isLoading} emptyText='محصولی موجود نیست' />
        </div>
    );
}
