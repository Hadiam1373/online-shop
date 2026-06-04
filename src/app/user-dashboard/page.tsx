'use client';
import { HeaderTitle } from '@/components';
import { useProfileInfo } from './user-dashboard.model';
import { Input } from '@/components/ui/input';
import styles from './user-dashboard.module.css';
import { Button } from '@/components/ui/button';

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
                        placeholder='ایمیل'
                        error={methods.formState.errors.email?.message}
                        autoComplete='email'
                    />
                    <Input
                        {...methods.register('address')}
                        type='text'
                        placeholder='آدرس'
                        error={methods.formState.errors.address?.message}
                        autoComplete='address'
                    />
                    <Input
                        {...methods.register('phone')}
                        type='text'
                        placeholder='تلفن'
                        error={methods.formState.errors.phone?.message}
                        autoComplete='tel'
                    />
                    <div className={styles['form_wrapper--submit_wrapper']}>
                        <Button className={styles['form_wrapper--submit']} type='submit' disabled={methods.formState.isSubmitting}>
                            ثبت
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};
export default UserDashboard;
