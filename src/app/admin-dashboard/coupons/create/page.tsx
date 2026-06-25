'use client';
import { HeaderTitle } from '@/components';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import styles from '../../admin-dashboard.module.css';
import { useCreateCouponModel } from '../coupons.model';

export default function CreateCouponPage() {
    const { form, onSubmit, isCreating } = useCreateCouponModel();
    const { register, handleSubmit } = form;

    return (
        <div className={styles['form_wrapper']}>
            <HeaderTitle title='ایجاد کوپن' />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='w-full grid grid-cols-2 gap-5'>
                    <Input label='کد کوپن' {...register('code')} placeholder='کد کوپن' />
                </div>
                <Input label='مقدار تخفیف' className='w-full col-span-2' {...register('value')} type='number' placeholder='مقدار تخفیف' />
                <div className={styles['form_wrapper--submit_wrapper']}>
                    <Button type='submit' disabled={isCreating}>
                        ایجاد
                    </Button>
                </div>
            </form>
        </div>
    );
}
