import { useEffect } from 'react';
import { IUserInfoForm } from './user-dashboard.dto';
import { registerFormSchema } from './user-dashboard.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useGetProfile, useUpdateUserProfile } from '@/lib/api/users/users.query';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useProfileInfo = () => {
    const { data: profileData } = useGetProfile();
    const { mutateAsync: updateProfile } = useUpdateUserProfile();
    const queryClient = useQueryClient();
    const methods = useForm<IUserInfoForm>({
        resolver: yupResolver(registerFormSchema),
        defaultValues: {
            email: '',
            phone: '',
            firstName: '',
            lastName: '',
            province: '',
            city: '',
            address: '',
            postalCode: '',
            deliveryNotes: '',
        },
    });

    useEffect(() => {
        if (profileData) {
            methods.reset({
                email: profileData.email || '',
                firstName: profileData.firstName || '',
                lastName: profileData.lastName || '',
                province: profileData.province || '',
                city: profileData.city || '',
                address: profileData.address || '',
                postalCode: profileData.postalCode || '',
                deliveryNotes: profileData.deliveryNotes || '',
                phone: profileData.phone || '',
            });
        }
    }, [profileData, methods]);

    const onSubmit: SubmitHandler<IUserInfoForm> = async data => {
        try {
            const updated = await updateProfile({
                firstName: data.firstName,
                lastName: data.lastName,
                province: data.province,
                city: data.city,
                address: data?.address,
                postalCode: data.postalCode,
                deliveryNotes: data.deliveryNotes,
                email: data?.email,
            });
            queryClient.setQueryData(['user-profile'], updated);
            toast.success('اطلاعات پروفایل ذخیره شد.');
        } catch (error) {
            console.error('Error updating user profile:', error);
            toast.error('ذخیره اطلاعات پروفایل انجام نشد. دوباره تلاش کنید.');
        }
    };
    return {
        profileData,
        methods,
        onSubmit,
    };
};
