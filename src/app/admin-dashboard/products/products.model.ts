import { useRouter } from 'next/navigation';
import {
    useGetAdminProducts,
    useDeleteAdminProduct,
    useCreateAdminProduct,
    useGetAdminProduct,
    useUpdateAdminProduct,
} from '@/lib/api/admin/admin.query';
import { IAdminProductInput } from '@/lib/api/admin/admin.products.dto';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

export const useProductsList = () => {
    const [page, setPage] = useState(1);
    const { data: products, isPending: isLoading } = useGetAdminProducts(page, 10);
    const deleteMutation = useDeleteAdminProduct();
    const router = useRouter();

    const handleDelete = (id: string) => {
        if (!confirm('آیا از حذف محصول مطمئن هستید؟')) return;
        deleteMutation.mutate(id, {
            onSuccess: () => router.refresh(),
        });
    };

    return { products, isLoading, handleDelete, page, setPage };
};

export const useCreateProductModel = () => {
    const createMutation = useCreateAdminProduct();
    const router = useRouter();
    const form = useForm<IAdminProductInput>({
        defaultValues: { name: '', description: '', price: 0, stock: 0, images: [], categoryId: '', attributes: {} },
    });
    const { watch, setValue } = form;

    const onSubmit = (data: IAdminProductInput) => {
        createMutation.mutate(
            {
                name: data.name,
                description: data.description,
                price: Number(data.price),
                stock: Number(data.stock),
                images: data.images ?? [],
                categoryId: data.categoryId,
                attributes: data.attributes,
            },
            {
                onSuccess: () => router.push('/admin-dashboard/products'),
            },
        );
    };

    return { form, onSubmit, isCreating: createMutation.isPending, watch, setValue };
};

export const useEditProductModel = (id: string) => {
    const { data: product, isLoading } = useGetAdminProduct(id || '');
    const updateMutation = useUpdateAdminProduct();
    const form = useForm<IAdminProductInput>();
    const { register, handleSubmit, reset, watch, setValue } = form;
    const router = useRouter();

    useEffect(() => {
        if (product) {
            reset({
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock,
                images: product.images,
                categoryId: product.categoryId,
                attributes: product.attributes ?? {},
            });
        }
    }, [product, reset]);

    const onSubmit = (data: IAdminProductInput) => {
        updateMutation.mutate(
            { id, payload: { ...data, price: Number(data.price), stock: Number(data.stock) } },
            {
                onSuccess: () => router.push('/admin-dashboard/products'),
            },
        );
    };

    return { register, handleSubmit, onSubmit, isUpdating: updateMutation.isPending, isLoading, product, watch, setValue };
};
