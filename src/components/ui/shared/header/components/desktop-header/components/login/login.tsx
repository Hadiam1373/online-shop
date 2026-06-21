'use client';
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { Input } from '@/components/ui/input';
import { cookieWrapper } from '@/lib/cookie';
import { useLoginModel } from '@/components/ui/shared/header/components/desktop-header/components/login/login.model';
import { Profile } from '@/components/ui/shared/header/components/desktop-header/components/profile';

export const Login: React.FC = () => {
    const { methods, onSubmit, loginStep, openModal, setOpenModal, isLogin } = useLoginModel();
    if (isLogin === null) return null;
    if (isLogin) return <Profile />;
    return (
        <Dialog open={openModal}>
            <DialogTrigger asChild>
                <Button onClick={() => setOpenModal(true)} className='rounded-full px-5'>
                    ورود
                </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-md'>
                <DialogHeader>
                    <DialogTitle>ورود به حساب کاربری</DialogTitle>
                    <DialogDescription>
                        {loginStep === 0
                            ? 'شماره تلفن خود را وارد کنید تا کد یکبار مصرف دریافت کنید'
                            : 'کد ارسال شده به تلفن همراه خود را وارد کنید'}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={methods.handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                    {loginStep === 0 ? (
                        <Input
                            {...methods.register('phone')}
                            type='tel'
                            placeholder='شماره تلفن'
                            error={methods.formState.errors.phone?.message}
                            autoComplete='tel'
                        />
                    ) : loginStep === 1 ? (
                        <InputOTP
                            {...methods.register('otp')}
                            onChange={e => methods.setValue('otp', e)}
                            id='digits-only'
                            maxLength={6}
                            pattern={REGEXP_ONLY_DIGITS}
                        >
                            <InputOTPGroup className='mx-auto'>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                    ) : null}
                    <Button variant='default' type='submit' className='w-full'>
                        {loginStep === 0 ? 'ارسال کد' : 'تأیید کد'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};
