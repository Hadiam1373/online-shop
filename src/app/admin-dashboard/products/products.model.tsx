import { useRouter } from 'next/navigation';
import {
    useGetAdminProducts,
    useDeleteAdminProduct,
    useCreateAdminProduct,
    useGetAdminProduct,
    useUpdateAdminProduct,
} from '@/lib/api/admin/admin.query';
import { IAdminProductInput } from '@/lib/api/admin/admin.products.dto';
import { useFieldArray, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

type IAttributeField = {
    key: string;
    value: string;
};

type IAdminProductFormValues = Omit<IAdminProductInput, 'attributes'> & {
    attributes: IAttributeField[];
};

const mapAttributesToArray = (attributes?: Record<string, any>): IAttributeField[] => {
    if (!attributes || typeof attributes !== 'object') return [{ key: '', value: '' }];

    const entries = Object.entries(attributes).map(([key, value]) => ({ key, value: String(value) }));
    return entries.length > 0 ? [...entries, { key: '', value: '' }] : [{ key: '', value: '' }];
};

const mapAttributesToObject = (attributes: IAttributeField[] = []) => {
    return attributes.reduce<Record<string, any>>((acc, attribute) => {
        const key = attribute.key?.trim();
        if (!key) return acc;
        acc[key] = attribute.value;
        return acc;
    }, {});
};

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

    const rows =
        products?.products?.map(product => ({
            id: product.id,
            fields: [
                { label: 'نام محصول', value: product.name },
                { label: 'قیمت', value: product.price },
                { label: 'موجودی', value: product.stock },
                { label: 'شناسه محصول', value: product.id },
            ],
            actions: (
                <div className='flex gap-4 items-center'>
                    <Button variant='outline' size='sm' onClick={() => router.push(`/admin-dashboard/products/${product.id}`)}>
                        ویرایش
                    </Button>
                    <Button variant='destructive' size='sm' className='mr-2' onClick={() => handleDelete(product.id)}>
                        حذف
                    </Button>
                </div>
            ),
        })) ?? [];

    return { products, isLoading, handleDelete, page, setPage, rows };
};

export const useCreateProductModel = () => {
    const createMutation = useCreateAdminProduct();
    const router = useRouter();
    const form = useForm<IAdminProductFormValues>({
        defaultValues: { name: '', description: '', price: 0, stock: 0, images: [], categoryId: '', attributes: [{ key: '', value: '' }] },
    });
    const { watch, setValue, control } = form;
    const attributesFieldArray = useFieldArray({ control, name: 'attributes' });

    const onSubmit = (data: IAdminProductFormValues) => {
        const attributes = mapAttributesToObject(data.attributes);

        createMutation.mutate(
            {
                name: data.name,
                description: data.description,
                price: Number(data.price),
                stock: Number(data.stock),
                images: data.images ?? [],
                categoryId: data.categoryId,
                attributes,
            },
            {
                onSuccess: () => router.push('/admin-dashboard/products'),
            },
        );
    };

    return {
        form,
        onSubmit,
        isCreating: createMutation.isPending,
        watch,
        setValue,
        attributesFieldArray,
    };
};

export const useEditProductModel = (id: string) => {
    const { data: product, isLoading } = useGetAdminProduct(id || '');
    const updateMutation = useUpdateAdminProduct();
    const form = useForm<IAdminProductFormValues>();
    const { register, handleSubmit, reset, watch, setValue, control } = form;
    const attributesFieldArray = useFieldArray({ control, name: 'attributes' });
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
                attributes: mapAttributesToArray(product.attributes),
            });
        }
    }, [product, reset]);

    const onSubmit = (data: IAdminProductFormValues) => {
        const attributes = mapAttributesToObject(data.attributes);

        updateMutation.mutate(
            {
                id,
                payload: {
                    name: data.name,
                    description: data.description,
                    price: Number(data.price),
                    stock: Number(data.stock),
                    images: data.images ?? [],
                    categoryId: data.categoryId,
                    attributes,
                },
            },
            {
                onSuccess: () => router.push('/admin-dashboard/products'),
            },
        );
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        isUpdating: updateMutation.isPending,
        isLoading,
        product,
        watch,
        setValue,
        attributesFieldArray,
    };
};
