import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { object, string } from 'yup';

export const otpSchema = object({
    otp: string().required('Otp is required'),
    phone: string().required('Phone number is required'),
});
