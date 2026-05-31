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
        console.log('Form Data:', data);
        if (loginStep === 0) {
            // Simulate sending OTP
            console.log('Sending OTP to phone number:', data.phone);
            setLoginStep(1);
        } else if (loginStep === 1) {
            // Simulate verifying OTP
            console.log('Verifying OTP:', data.otp);
            // Reset form and go back to step 0 after verification
            methods.reset();
            setLoginStep(0);
        }
    };

    return {
        methods,
        onSubmit,
        loginStep,
        setLoginStep,
    };
};
