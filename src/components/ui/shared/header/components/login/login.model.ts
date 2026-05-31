import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { otpSchema } from './login.schema';
import { IOtpFormData } from './login.dto';
import { useState } from 'react';

export const useLoginModel = () => {
    const [loginStep, setLoginStep] = useState<number>(0);
    const methods = useForm({
        resolver: yupResolver(otpSchema),
    });
    const onSubmit: SubmitHandler<IOtpFormData> = data => {
        if (loginStep === 0) {
            if (!data.phone) {
                methods.setError('phone', {
                    message: 'Phone number is required',
                });
                return;
            }

            setLoginStep(1);
            return;
        }

        if (!data.otp) {
            methods.setError('otp', {
                message: 'OTP is required',
            });
            return;
        }

        console.log(data);
    };

    return {
        methods,
        onSubmit,
        loginStep,
        setLoginStep,
    };
};
