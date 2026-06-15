'use client';
import { HeaderTitle } from '@/components';
import { Button } from '@/components/ui/button';
import { DesktopTable } from '@/components/ui/table/desktop-table';
import { MobileCardTable } from '@/components/ui/table/mobile-table';
import styles from '../admin-dashboard.module.css';
import { useRouter } from 'next/navigation';
import { useCategoriesList } from './categories.model';

export default function CategoriesPage() {
    const router = useRouter();
    const { categories, isLoading, handleDelete } = useCategoriesList();

    const rows =
        categories?.data?.map(category => ({
            id: category.id,
            fields: [
                { label: 'نام', value: category.name },
                { label: 'توضیحات', value: category.description ?? '---' },
                { label: 'شناسه', value: category.id },
            ],
            actions: (
                <div className='flex gap-4 items-center'>
                    <Button variant='outline' size='sm' onClick={() => router.push(`/admin-dashboard/categories/${category.id}`)}>
                        ویرایش
                    </Button>
                    <Button variant='destructive' size='sm' className='mr-2' onClick={() => handleDelete(category.id)}>
                        حذف
                    </Button>
                </div>
            ),
        })) ?? [];

    return (
        <div className={styles['form_wrapper']}>
            <HeaderTitle
                title='دسته‌بندی‌ها'
                children={<Button onClick={() => router.push('/admin-dashboard/categories/create')}>ایجاد دسته</Button>}
            />

            <DesktopTable
                head={['نام', 'توضیحات', 'شناسه', 'اقدامات']}
                isLoading={isLoading}
                isShowEmptyState={!categories?.data?.length}
                body={
                    <tbody>
                        {categories?.data?.map(c => (
                            <tr key={c.id} className='border-t'>
                                <td className='py-2'>{c.name}</td>
                                <td className='py-2'>{c.description ?? '---'}</td>
                                <td className='py-2'>{c.id}</td>
                                <td className='py-2 w-full flex justify-center gap-1'>
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
                }
            />

            <MobileCardTable data={rows} loading={isLoading} emptyText='دسته‌ای موجود نیست' />
        </div>
    );
}
