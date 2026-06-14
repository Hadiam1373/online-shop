'use client';
import { HeaderTitle } from '@/components';
import { Button } from '@/components/ui/button';
import styles from '../admin-dashboard.module.css';
import { useRouter } from 'next/navigation';
import { useCategoriesList } from './categories.model';

export default function CategoriesPage() {
    const router = useRouter();
    const { categories, isLoading, handleDelete } = useCategoriesList();

    return (
        <div className={styles['form_wrapper']}>
            <HeaderTitle title='دسته‌بندی‌ها' />
            <div className={styles['form_wrapper--inputs']}>
                <Button onClick={() => router.push('/admin-dashboard/categories/create')}>ایجاد دسته</Button>
            </div>

            {isLoading && <p>در حال بارگذاری...</p>}

            {!isLoading && categories && (
                <table className='w-full text-right mt-4'>
                    <thead>
                        <tr className='text-sm text-muted-foreground'>
                            <th>نام</th>
                            <th>توضیحات</th>
                            <th>اقدامات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(c => (
                            <tr key={c.id} className='border-t'>
                                <td className='py-2'>{c.name}</td>
                                <td className='py-2'>{c.description}</td>
                                <td className='py-2'>
                                    <Button variant='outline' size='sm' onClick={() => router.push(`/admin-dashboard/categories/${c.id}`)}>
                                        ویرایش
                                    </Button>
                                    <Button variant='destructive' size='sm' className='mr-2' onClick={() => handleDelete(c.id)}>
                                        حذف
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
