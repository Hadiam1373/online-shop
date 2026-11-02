import { object, ref, string } from 'yup';

export const registerFormSchema = object({
    email: string().email('فرمت ایمیل نادرست است').default(''),
    phone: string().default(''),
    firstName: string().trim().max(100).default(''),
    lastName: string().trim().max(100).default(''),
    province: string().trim().max(100).default(''),
    city: string().trim().max(100).default(''),
    address: string().trim().max(1000).default(''),
    postalCode: string()
        .default('')
        .test('postal-code', 'کد پستی باید ۱۰ رقم باشد', value => !value || /^[0-9۰-۹٠-٩]{10}$/.test(value)),
    deliveryNotes: string().max(500).default(''),
});
