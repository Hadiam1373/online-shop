'use client';
import { HeaderTitle } from '@/components';
import { Button } from '@/components/ui/button';
import Pagination from '@/components/ui/pagination';
import { DesktopTable } from '@/components/ui/table/desktop-table';
import { MobileCardTable } from '@/components/ui/table/mobile-table';
import { useRouter } from 'next/navigation';
import styles from '../admin-dashboard.module.css';
import { useProductsList } from './products.model';

export default function ProductsPage() {
    const router = useRouter();
    const { products, isLoading, handleDelete, setPage, page, rows } = useProductsList();

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

            <div className='flex w-full justify-center items-center mt-10'>
                <Pagination currentPage={page} onPageChange={setPage} totalPages={products?.pagination?.pages || 1} />
            </div>
        </div>
    );
}
