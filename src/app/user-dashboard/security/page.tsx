'use client';

import { Typography } from '@/components/ui/typography';
import styles from '../user-dashboard.module.css';
import { userSecurityData } from './security.model';
import { HeaderTitle } from '@/components';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ShieldCheck } from 'lucide-react';

const Security = () => {
    const { methods, onSubmit } = userSecurityData();
    return (
        <div className={styles['form_wrapper']}>
            <HeaderTitle title='امنیت حساب کاربری' />
            <Card className='p-6 mt-2'>
                <div className='flex items-start gap-3 mb-4'>
                    <span className='flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent text-primary'>
                        <ShieldCheck className='size-5' />
                    </span>
                    <Typography variant='body2' md-variant='body1' lg-variant='subtitle1' className='text-muted-foreground'>
                        در این بخش می‌توانید رمز عبور حساب کاربری خود را تغییر دهید. لطفاً برای حفظ امنیت حساب خود، از رمز عبور قوی استفاده
                        کنید و آن را با کسی به اشتراک نگذارید.
                    </Typography>
                </div>
                <form onSubmit={methods.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                        <Input
                            type='password'
                            placeholder='رمز عبور فعلی'
                            {...methods.register('currentPassword')}
                            error={methods.formState.errors.currentPassword?.message}
                        />
                        <Input
                            type='password'
                            placeholder='رمز عبور جدید'
                            {...methods.register('newPassword')}
                            error={methods.formState.errors.newPassword?.message}
                        />
                        <Input
                            type='password'
                            placeholder='تکرار رمز عبور جدید'
                            {...methods.register('confirmPassword')}
                            error={methods.formState.errors.confirmPassword?.message}
                        />
                    </div>
                    <div className='flex gap-2 mt-2'>
                        <Button type='submit' disabled={!methods.formState.isDirty}>
                            ذخیره تغییرات
                        </Button>
                        <Button variant='secondary' type='button'>
                            انصراف
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};
export default Security;
