import { useEffect } from 'react';
import { IUserInfoForm } from './user-dashboard.dto';
import { registerFormSchema } from './user-dashboard.schema';
import { useGetProfile, useUpdateUserProfile } from '@/lib/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

export const useProfileInfo = () => {
    const { data: profileData } = useGetProfile({});
    const { mutate: updateProfile } = useUpdateUserProfile();
    const methods = useForm({
        resolver: yupResolver(registerFormSchema),
    });

    useEffect(() => {
        if (profileData) {
            methods.reset({
                email: profileData.email || '',
                address: profileData.address || '',
                phone: profileData.phone || '',
            });
        }
    }, [profileData, methods]);

    const onSubmit: SubmitHandler<IUserInfoForm> = data =>
        updateProfile({
            address: data?.address,
            email: data?.email,
            phone: data?.phone,
        });
    return {
        profileData,
        methods,
        onSubmit,
    };
};
