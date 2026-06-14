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
                <Input {...register('name')} placeholder='نام دسته' />
                <Textarea {...register('description')} placeholder='توضیحات' />
                <div className={styles['form_wrapper--submit_wrapper']}>
                    <Button type='submit' disabled={isCreating}>
                        ایجاد
                    </Button>
                </div>
            </form>
        </div>
    );
}
