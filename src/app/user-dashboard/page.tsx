'use client';
import { HeaderTitle } from '@/components';
import { useProfileInfo } from './user-dashboard.model';
import { Input } from '@/components/ui/input';
import styles from './user-dashboard.module.css';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const UserDashboard: React.FC = () => {
    const { methods, onSubmit } = useProfileInfo();
    return (
        <div className={styles['form_wrapper']}>
            <HeaderTitle title='پروفایل کاربر' />
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <div className={styles['form_wrapper--inputs']}>
                    <Input
                        {...methods.register('email')}
                        type='email'
                        label='ایمیل (اختیاری)'
                        placeholder='ایمیل'
                        error={methods.formState.errors.email?.message}
                        autoComplete='email'
                    />
                    <Input
                        {...methods.register('phone')}
                        type='text'
                        label='شماره تلفن'
                        placeholder='تلفن'
                        error={methods.formState.errors.phone?.message}
                        autoComplete='tel'
                        disabled
                    />
                    <Input
                        {...methods.register('firstName')}
                        label='نام'
                        placeholder='نام گیرنده'
                        autoComplete='given-name'
                        error={methods.formState.errors.firstName?.message}
                    />
                    <Input
                        {...methods.register('lastName')}
                        label='نام خانوادگی'
                        placeholder='نام خانوادگی گیرنده'
                        autoComplete='family-name'
                        error={methods.formState.errors.lastName?.message}
                    />
                    <Input
                        {...methods.register('province')}
                        label='استان'
                        placeholder='استان'
                        autoComplete='address-level1'
                        error={methods.formState.errors.province?.message}
                    />
                    <Input
                        {...methods.register('city')}
                        label='شهر'
                        placeholder='شهر'
                        autoComplete='address-level2'
                        error={methods.formState.errors.city?.message}
                    />
                    <Textarea
                        {...methods.register('address')}
                        label='آدرس کامل'
                        placeholder='آدرس'
                        error={methods.formState.errors.address?.message}
                        autoComplete='street-address'
                    />
                    <Input
                        {...methods.register('postalCode')}
                        label='کد پستی'
                        placeholder='۱۰ رقم'
                        inputMode='numeric'
                        autoComplete='postal-code'
                        maxLength={10}
                        error={methods.formState.errors.postalCode?.message}
                    />
                    <Textarea
                        {...methods.register('deliveryNotes')}
                        label='توضیحات تحویل (اختیاری)'
                        placeholder='زمان یا نکتهٔ موردنظر برای تحویل'
                        error={methods.formState.errors.deliveryNotes?.message}
                    />
                    <div className={styles['form_wrapper--submit_wrapper']}>
                        <Button
                            variant='outline'
                            className={styles['form_wrapper--submit']}
                            type='submit'
                            disabled={methods.formState.isSubmitting}
                        >
                            {methods.formState.isSubmitting ? 'در حال ذخیره...' : 'ذخیره اطلاعات'}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};
export default UserDashboard;
