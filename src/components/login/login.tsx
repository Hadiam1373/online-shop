'use client';
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { Input } from '@/components/ui/input';
import { cookieWrapper } from '@/lib/cookie';
import { useLoginModel } from '@/components/login/login.model';
import { Profile } from '@/components/profile';

export const Login: React.FC = () => {
    const { methods, onSubmit, loginStep, openModal, setOpenModal, isLogin } = useLoginModel();
    if (isLogin === null) return null;
    if (isLogin) return <Profile />;
    return (
        <Dialog open={openModal}>
            <DialogTrigger asChild>
                <Button variant='outline' onClick={() => setOpenModal(true)}>
                    ورود
                </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-md'>
                <DialogHeader>
                    <DialogTitle>ورود</DialogTitle>
                    <DialogDescription>
                        {loginStep === 0
                            ? 'شماره تلفن خود را وارد کنید تا OTP دریافت کنید'
                            : 'OTP ارسال شده به تلفن همراه خود را وارد کنید'}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <div className='flex items-center justify-between'>
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
                        <Button variant='default' type='submit' className='ms-4'>
                            {loginStep === 0 ? 'ارسال OTP' : 'تأیید OTP'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
