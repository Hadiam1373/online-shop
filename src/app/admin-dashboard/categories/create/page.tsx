'use client';
import { HeaderTitle } from '@/components';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import styles from '../../admin-dashboard.module.css';
import { useCreateCategoryModel } from '../categories.model';

export default function CreateCategoryPage() {
    const { form, onSubmit, isCreating } = useCreateCategoryModel();
    const { register, handleSubmit } = form;

    return (
        <div className={styles['form_wrapper']}>
            <HeaderTitle title='ایجاد دسته' />
            <form onSubmit={handleSubmit(onSubmit)} className={styles['form_wrapper--inputs']}>
                <div className='w-full grid grid-cols-2 gap-5'>
                    <Input label='نام دسته' {...register('name')} placeholder='نام دسته' />
                </div>
                <Textarea label='توضیحات' className='col-span-2 w-full' {...register('description')} placeholder='توضیحات' />
                <div className={styles['form_wrapper--submit_wrapper']}>
                    <Button type='submit' disabled={isCreating}>
                        ایجاد
                    </Button>
                </div>
            </form>
        </div>
    );
}
