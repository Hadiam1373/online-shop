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
import { Button } from '@/components/ui/button';
import { useQueryClient } from '@tanstack/react-query';

export const useCategoriesList = (page?: number, limit?: number) => {
    const { data: categories, isLoading } = useGetAdminCategories(page, limit);
    const deleteMutation = useDeleteAdminCategory();
    const router = useRouter();
    const queryClient = useQueryClient();

    const handleDelete = (id: string) => {
        if (!confirm('آیا از حذف دسته مطمئن هستید؟')) return;
        deleteMutation.mutate(id, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
                router.refresh();
            },
        });
    };

    const rows =
        categories?.data?.map(category => ({
            id: category.id,
            fields: [
                { label: 'نام', value: category.name },
                { label: 'توضیحات', value: category.description ?? '---' },
                { label: 'شناسه', value: category.id },
            ],
            actions: (
                <div className='flex gap-2 items-center'>
                    <Button variant='outline' size='sm' onClick={() => router.push(`/admin-dashboard/categories/${category.id}`)}>
                        ویرایش
                    </Button>
                    <Button variant='destructive' size='sm' onClick={() => handleDelete(category.id)}>
                        حذف
                    </Button>
                </div>
            ),
        })) ?? [];

    return { categories, isLoading, handleDelete, rows };
};

export const useCreateCategoryModel = () => {
    const queryClient = useQueryClient();
    const createMutation = useCreateAdminCategory();
    const router = useRouter();
    const form = useForm<IAdminCategoryInput>();

    const onSubmit = (data: IAdminCategoryInput) => {
        createMutation.mutate(data, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
                router.push('/admin-dashboard/categories');
            },
        });
    };

    return { form, onSubmit, isCreating: createMutation.isPending };
};

export const useEditCategoryModel = (id: string) => {
    const queryClient = useQueryClient();
    const { data: category, isLoading } = useGetAdminCategory(id || '');
    const updateMutation = useUpdateAdminCategory();
    const { register, handleSubmit, reset } = useForm<IAdminCategoryUpdateInput>();
    const router = useRouter();

    React.useEffect(() => {
        if (category) reset({ name: category.name, description: category.description });
    }, [category, reset]);

    const onSubmit = (data: IAdminCategoryUpdateInput) => {
        updateMutation.mutate(
            { id, payload: data },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
                    router.push('/admin-dashboard/categories');
                },
            },
        );
    };

    return { register, handleSubmit, onSubmit, isUpdating: updateMutation.isPending, isLoading, category };
};
