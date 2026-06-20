import { object, string } from 'yup';

export const otpSchema = object({
    phone: string(),
    otp: string(),
});
