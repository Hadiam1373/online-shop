import { object, ref, string } from 'yup';

export const registerFormSchema = object({
    email: string().email('فرمت ایمیل نادرست است').required('ایمیل الزامی است'),
    phone: string()
        .matches(/^\d{11}$/, 'شماره تلفن باید 11 رقم باشد')
        .required('شماره تلفن الزامی است'),
    address: string().required('آدرس الزامی است'),
});
