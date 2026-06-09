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
                        placeholder='ایمیل'
                        error={methods.formState.errors.email?.message}
                        autoComplete='email'
                    />
                    <Input
                        {...methods.register('phone')}
                        type='text'
                        placeholder='تلفن'
                        error={methods.formState.errors.phone?.message}
                        autoComplete='tel'
                        disabled
                    />
                    <Textarea
                        {...methods.register('address')}
                        placeholder='آدرس'
                        error={methods.formState.errors.address?.message}
                        autoComplete='address'
                    />
                    <div className={styles['form_wrapper--submit_wrapper']}>
                        <Button
                            variant='outline'
                            className={styles['form_wrapper--submit']}
                            type='submit'
                            disabled={methods.formState.isSubmitting}
                        >
                            ثبت
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};
export default UserDashboard;
