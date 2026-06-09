import { useForm } from 'react-hook-form';
import { IChangePassword } from './security.dto';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useChangePassword } from '@/lib/api/users/users.query';
import { toast } from 'sonner';

const changePasswordSchema = yup.object().shape({
    currentPassword: yup.string().required('رمز عبور فعلی الزامی است'),
    newPassword: yup.string().required('رمز عبور جدید الزامی است').min(8, 'رمز عبور باید حداقل 8 کاراکتر باشد'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('newPassword')], 'تایید رمز عبور باید با رمز عبور جدید مطابقت داشته باشد')
        .required('تایید رمز عبور الزامی است'),
});

export const userSecurityData = () => {
    const { mutateAsync: changePassword } = useChangePassword();
    const methods = useForm<IChangePassword>({
        resolver: yupResolver(changePasswordSchema),
    });
    const onSubmit = async (data: IChangePassword) => {
        try {
            await changePassword(data);
            methods.reset();
        } catch (error) {
            console.error('Error changing password:', error);
        }
    };
    return { methods, onSubmit };
};
