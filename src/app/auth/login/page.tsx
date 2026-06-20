'use client';
import { useLogin } from '@/app/auth/login/login.model';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Typography } from '@/components/ui/typography';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import Image from 'next/image';

const LoginPage = () => {
    const { methods, onSubmit, loginStep } = useLogin();
    return (
        <div className='grid grid-cols-1 md:grid-cols-2  justify-center items-center h-screen w-full max-w-[1280px] mx-auto px-8 md:px-10 lg:px-20 box-border'>
            <Card className='col-span-1'>
                <CardHeader>
                    <Typography variant='subtitle1' weight='bold'>
                        صفحه ورود
                    </Typography>
                    <Typography variant='body2' className='text-secondary'>
                        {loginStep === 0
                            ? 'شماره تلفن خود را وارد کنید تا کد ورود دریافت کنید'
                            : 'کد ورود ارسال شده به تلفن همراه خود را وارد کنید'}
                    </Typography>
                </CardHeader>
                <CardContent>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <div className='flex flex-wrap md:flex-nowrap gap-2.5 items-center justify-between'>
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
                                {loginStep === 0 ? 'ارسال کد ورود' : 'تأیید کد ورود'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
            <div className='col-span-1 hidden md:flex items-end justify-end'>
                <Image src='/image/logo.png' width='400' height={400} alt='' />
            </div>
        </div>
    );
};
export default LoginPage;
