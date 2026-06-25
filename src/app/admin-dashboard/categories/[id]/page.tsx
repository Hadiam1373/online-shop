'use client';
import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useEditCategoryModel } from '../categories.model';
import { HeaderTitle } from '@/components';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import styles from '../../admin-dashboard.module.css';
import { Spinner } from '@/components/ui/spinner';

export default function EditCategoryPage() {
    const params = useParams() as { id?: string };
    const id = params?.id || '';
    const { register, handleSubmit, onSubmit, isUpdating, isLoading } = useEditCategoryModel(id);

    if (isLoading) return <Spinner />;

    return (
        <div className={styles['form_wrapper']}>
            <HeaderTitle title='ویرایش دسته' />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='w-full grid grid-cols-2 gap-5'>
                    <Input label='نام دسته' {...register('name')} placeholder='نام دسته' />
                </div>
                <Textarea label='توضیحات' className='col-span-2 w-full' {...register('description')} placeholder='توضیحات' />
                <div className={styles['form_wrapper--submit_wrapper']}>
                    <Button type='submit' disabled={isUpdating}>
                        ذخیره
                    </Button>
                </div>
            </form>
        </div>
    );
}
