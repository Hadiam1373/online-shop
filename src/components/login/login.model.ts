import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { otpSchema } from './login.schema';
import { IOtpFormData } from './login.dto';
import { useState } from 'react';
import { useOtpRequest, useOtpVerify } from '@/lib/api/auth';
import { cookieWrapper } from '@/lib/cookie';

export const useLoginModel = () => {
    const { mutateAsync: requestOtp } = useOtpRequest();
    const { mutateAsync: verifyOtp } = useOtpVerify();
    const [loginStep, setLoginStep] = useState<number>(0);
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
                const res = await requestOtp({ phone: data.phone });
                setLoginStep(1);
                alert(res.otp);
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
            const res = await verifyOtp({ code: data.otp, phone: data.phone! });
            cookieWrapper.set('accessToken', res.accessToken, { path: '/' });
            cookieWrapper.set('refreshToken', res.refreshToken, { path: '/' });
            setLoginStep(0);
            methods.reset();
        } catch (error) {
            console.error('Error verifying OTP:', error);
        }
    };

    return {
        methods,
        onSubmit,
        loginStep,
        setLoginStep,
    };
};
