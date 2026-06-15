import { useRouter } from 'next/navigation';
import {
    useGetAdminCategories,
    useCreateAdminCategory,
    useGetAdminCategory,
    useUpdateAdminCategory,
    useDeleteAdminCategory,
} from '@/lib/api/admin/admin.query';
import { IAdminCategoryInput, IAdminCategoryResponse, IAdminCategoryUpdateInput } from '@/lib/api/admin/admin.categories.dto';
import { useForm } from 'react-hook-form';
import React from 'react';

export const useCategoriesList = (page?: number, limit?: number) => {
    const { data: categories, isLoading } = useGetAdminCategories(page, limit);
    const deleteMutation = useDeleteAdminCategory();
    const router = useRouter();

    const handleDelete = (id: string) => {
        if (!confirm('آیا از حذف دسته مطمئن هستید؟')) return;
        deleteMutation.mutate(id, { onSuccess: () => router.refresh() });
    };

    return { categories, isLoading, handleDelete };
};

export const useCreateCategoryModel = () => {
    const createMutation = useCreateAdminCategory();
    const router = useRouter();
    const form = useForm<IAdminCategoryInput>();

    const onSubmit = (data: IAdminCategoryInput) => {
        createMutation.mutate(data, { onSuccess: () => router.push('/admin-dashboard/categories') });
    };

    return { form, onSubmit, isCreating: createMutation.isPending };
};

export const useEditCategoryModel = (id: string) => {
    const { data: category, isLoading } = useGetAdminCategory(id || '');
    const updateMutation = useUpdateAdminCategory();
    const { register, handleSubmit, reset } = useForm<IAdminCategoryUpdateInput>();
    const router = useRouter();

    React.useEffect(() => {
        if (category) reset({ name: category.name, description: category.description });
    }, [category, reset]);

    const onSubmit = (data: IAdminCategoryUpdateInput) => {
        updateMutation.mutate({ id, payload: data }, { onSuccess: () => router.push('/admin-dashboard/categories') });
    };

    return { register, handleSubmit, onSubmit, isUpdating: updateMutation.isPending, isLoading, category };
};
