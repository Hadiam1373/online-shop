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
            <form onSubmit={handleSubmit(onSubmit)} className={styles['form_wrapper--inputs']}>
                <Input {...register('code')} placeholder='کد کوپن' />
                <Input {...register('value')} type='number' placeholder='مقدار تخفیف' />
                <div className={styles['form_wrapper--submit_wrapper']}>
                    <Button type='submit' disabled={isCreating}>
                        ایجاد
                    </Button>
                </div>
            </form>
        </div>
    );
}
