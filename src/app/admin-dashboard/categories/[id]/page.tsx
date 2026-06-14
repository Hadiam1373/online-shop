'use client';
import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useEditCategoryModel } from '../categories.model';
import { HeaderTitle } from '@/components';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import styles from '../../admin-dashboard.module.css';

export default function EditCategoryPage() {
    const params = useParams() as { id?: string };
    const id = params?.id || '';
    const { register, handleSubmit, onSubmit, isUpdating, isLoading } = useEditCategoryModel(id);

    if (isLoading) return <p>در حال بارگذاری...</p>;

    return (
        <div className={styles['form_wrapper']}>
            <HeaderTitle title='ویرایش دسته' />
            <form onSubmit={handleSubmit(onSubmit)} className={styles['form_wrapper--inputs']}>
                <Input {...register('name')} placeholder='نام دسته' />
                <Textarea {...register('description')} placeholder='توضیحات' />
                <div className={styles['form_wrapper--submit_wrapper']}>
                    <Button type='submit' disabled={isUpdating}>
                        ذخیره
                    </Button>
                </div>
            </form>
        </div>
    );
}
