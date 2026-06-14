'use client';
import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useEditProductModel } from '../products.model';
import { HeaderTitle } from '@/components';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import styles from '../../admin-dashboard.module.css';

export default function EditProductPage() {
    const params = useParams() as { id?: string };
    const id = params?.id || '';
    const { register, handleSubmit, onSubmit, isUpdating, isLoading } = useEditProductModel(id);

    if (isLoading) return <p>در حال بارگذاری...</p>;

    return (
        <div className={styles['form_wrapper']}>
            <HeaderTitle title='ویرایش محصول' />
            <form onSubmit={handleSubmit(onSubmit)} className={styles['form_wrapper--inputs']}>
                <Input {...register('name')} placeholder='نام محصول' />
                <Textarea {...register('description')} placeholder='توضیحات' />
                <Input {...register('price')} type='number' placeholder='قیمت' />
                <Input {...register('stock')} type='number' placeholder='موجودی' />
                <Input {...register('categoryId')} placeholder='دسته‌بندی (id)' />
                <div className={styles['form_wrapper--submit_wrapper']}>
                    <Button type='submit' disabled={isUpdating}>
                        ذخیره
                    </Button>
                </div>
            </form>
        </div>
    );
}
