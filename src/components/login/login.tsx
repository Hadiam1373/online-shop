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
    const [isLogin, setIsLogin] = React.useState<boolean | null>(null);
    React.useEffect(() => {
        setIsLogin(!!cookieWrapper.get('accessToken'));
    }, []);

    const { methods, onSubmit, loginStep } = useLoginModel();
    if (isLogin === null) return null;
    if (isLogin) return 'Profile';
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='outline'>Login</Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-md'>
                <DialogHeader>
                    <DialogTitle>Login</DialogTitle>
                    <DialogDescription>
                        {loginStep === 0 ? 'Enter your phone number to receive an OTP' : 'Enter the OTP sent to your phone'}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <div className='flex items-center justify-between'>
                        {loginStep === 0 ? (
                            <Input
                                {...methods.register('phone')}
                                type='tel'
                                placeholder='Phone Number'
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
                        <Button variant='default' type='submit' className='ml-4'>
                            {loginStep === 0 ? 'Send OTP' : 'Verify OTP'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
