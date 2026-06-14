'use client';
import { HeaderTitle } from '@/components';
import { Button } from '@/components/ui/button';
import styles from '../admin-dashboard.module.css';
import { useRouter } from 'next/navigation';
import { useProductsList } from './products.model';

export default function ProductsPage() {
    const router = useRouter();
    const { products, isLoading, handleDelete } = useProductsList();

    return (
        <div className={styles['form_wrapper']}>
            <HeaderTitle title='مدیریت محصولات' />
            <div className={styles['form_wrapper--inputs']}>
                <Button onClick={() => router.push('/admin-dashboard/products/create')}>ایجاد محصول</Button>
            </div>

            {isLoading && <p>در حال بارگذاری...</p>}

            {!isLoading && products && (
                <div className='mt-4'>
                    <table className='w-full text-right'>
                        <thead>
                            <tr className='text-sm text-muted-foreground'>
                                <th>نام</th>
                                <th>قیمت</th>
                                <th>موجودی</th>
                                <th>دسته</th>
                                <th>اقدامات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products?.map(p => (
                                <tr key={p.id} className='border-t'>
                                    <td className='py-2'>{p.name}</td>
                                    <td className='py-2'>{p.price}</td>
                                    <td className='py-2'>{p.stock}</td>
                                    <td className='py-2'>{p.categoryId}</td>
                                    <td className='py-2'>
                                        <Button
                                            variant='outline'
                                            size='sm'
                                            onClick={() => router.push(`/admin-dashboard/products/${p.id}`)}
                                        >
                                            ویرایش
                                        </Button>
                                        <Button variant='destructive' size='sm' className='mr-2' onClick={() => handleDelete(p.id)}>
                                            حذف
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
