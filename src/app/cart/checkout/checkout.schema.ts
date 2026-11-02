import { InferType, object, string } from 'yup';

export const checkoutSchema = object({
    firstName: string().trim().min(2, 'نام باید حداقل ۲ حرف باشد').max(100).required('نام گیرنده الزامی است'),
    lastName: string().trim().min(2, 'نام خانوادگی باید حداقل ۲ حرف باشد').max(100).required('نام خانوادگی گیرنده الزامی است'),
    province: string().trim().min(2).max(100).required('استان را وارد کنید'),
    city: string().trim().min(2).max(100).required('شهر را وارد کنید'),
    address: string().trim().min(5, 'آدرس را کامل وارد کنید').max(1000).required('آدرس کامل الزامی است'),
    postalCode: string()
        .matches(/^[0-9۰-۹٠-٩]{10}$/, 'کد پستی باید ۱۰ رقم باشد')
        .required('کد پستی الزامی است'),
    deliveryNotes: string().max(500, 'توضیحات حداکثر ۵۰۰ حرف است').default(''),
});

export type CheckoutFormValues = InferType<typeof checkoutSchema>;
