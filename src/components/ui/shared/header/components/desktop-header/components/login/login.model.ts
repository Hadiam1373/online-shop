import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { otpSchema } from './login.schema';
import { IOtpFormData } from './login.dto';
import { useEffect, useState } from 'react';
import { cookieWrapper } from '@/lib/cookie';
import { useRequestOtp, useVerifyOtp, useLogin } from '@/lib/api/auth/auth.query';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useLoginModel = () => {
    const { mutate: requestOtp } = useRequestOtp();
    const { mutateAsync: verifyOtp } = useVerifyOtp();
    const queryClient = useQueryClient();
    const router = useRouter();
    const [loginStep, setLoginStep] = useState<number>(0);
    const [openModal, setOpenModal] = useState(false);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const methods = useForm({
        resolver: yupResolver(otpSchema),
    });

    const onSubmit: SubmitHandler<IOtpFormData> = async data => {
        if (loginStep === 0) {
            if (!data.phone) {
                methods.setError('phone', {
                    message: 'Phone number is required',
                });
                return;
            }
            try {
                const res = requestOtp({ phone: data?.phone });
                setLoginStep(1);
            } catch (error) {
                console.error('Error requesting OTP:', error);
            }
        }

        if (!data.otp) {
            methods.setError('otp', {
                message: 'OTP is required',
            });
            return;
        }

        try {
            setIsLoggingIn(true);
            const res = await verifyOtp({ code: data.otp, phone: data.phone! });

            // ذخیره توکن‌ها
            cookieWrapper.set('accessToken', res.accessToken, { path: '/' });
            cookieWrapper.set('refreshToken', res.refreshToken, { path: '/' });

            // اطلاع‌رسانی به اپ برای به‌روزرسانی وضعیت احراز هویت
            try {
                window.dispatchEvent(new Event('authChange'));
            } catch (e) {
                // سرور یا محیط بدون window
            }

            // آپدیت کش پروفایل
            await queryClient.invalidateQueries({ queryKey: ['user-profile'] });

            // انتظار کمی برای اطمینان از آپدیت پروفایل
            const userProfile = await queryClient.fetchQuery({
                queryKey: ['user-profile'],
                queryFn: () => import('@/lib/api/users/users.api').then(m => m.getUserProfile()),
            });

            // تغییر مسیر بر اساس نقش
            if (userProfile?.role === 'ADMIN' || userProfile?.role === 'OPERATOR') {
                router.push('/admin-dashboard');
            } else {
                router.push('/user-dashboard');
            }

            // بازنشانی فرم و بستن مودال
            setLoginStep(0);
            setOpenModal(false);
            methods.reset();
        } catch (error) {
            console.error('Error verifying OTP:', error);
            methods.setError('otp', {
                message: 'خطا در تایید OTP',
            });
        } finally {
            setIsLoggingIn(false);
        }
    };

    const [isLogin, setIsLogin] = useState<boolean | null>(null);
    useEffect(() => {
        setIsLogin(!!cookieWrapper.get('accessToken'));
    }, [openModal, loginStep]);

    return {
        methods,
        onSubmit,
        loginStep,
        setLoginStep,
        openModal,
        setOpenModal,
        isLogin,
        isLoggingIn,
    };
};
