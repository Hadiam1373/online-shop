'use client';
import { HeaderTitle } from '@/components';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import styles from '../../admin-dashboard.module.css';
import { useCreateProductModel } from '../products.model';

export default function CreateProductPage() {
    const { form, onSubmit, isCreating } = useCreateProductModel();
    const { register, handleSubmit } = form;

    return (
        <div className={styles['form_wrapper']}>
            <HeaderTitle title='ایجاد محصول' />
            <form onSubmit={handleSubmit(onSubmit)} className={styles['form_wrapper--inputs']}>
                <Input {...register('name')} placeholder='نام محصول' />
                <Textarea {...register('description')} placeholder='توضیحات' />
                <Input {...register('price')} type='number' placeholder='قیمت' />
                <Input {...register('stock')} type='number' placeholder='موجودی' />
                <Input {...register('categoryId')} placeholder='دسته‌بندی (id)' />
                <div className={styles['form_wrapper--submit_wrapper']}>
                    <Button type='submit' disabled={isCreating}>
                        ایجاد
                    </Button>
                </div>
            </form>
        </div>
    );
}
