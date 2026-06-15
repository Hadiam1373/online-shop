import { useRouter } from 'next/navigation';
import { useCreateAdminCoupon, useGetAdminCoupons } from '@/lib/api/admin/admin.query';
import { useForm } from 'react-hook-form';
import { IAdminCouponInput } from '@/lib/api/admin/admin.coupons.dto';

type CreateCouponFormValues = {
    code: string;
    value: number;
    discountType: 'FIXED' | 'PERCENTAGE';
    expirationDate?: string;
    usageLimit?: number;
};

export const useGetCouponModel = () => {
    const { data: coupons, isLoading } = useGetAdminCoupons();
    const rows =
        coupons?.data?.map(coupon => ({
            id: coupon.id,
            fields: [
                { label: 'کد', value: coupon.code },
                { label: 'نوع', value: coupon.discountType },
                { label: 'مقدار', value: coupon.discountValue },
            ],
        })) ?? [];

    return { coupons, rows, isLoading };
};

export const useCreateCouponModel = () => {
    const createMutation = useCreateAdminCoupon();
    const router = useRouter();
    const form = useForm<CreateCouponFormValues>({ defaultValues: { discountType: 'FIXED', value: 0 } });

    const onSubmit = (data: CreateCouponFormValues) => {
        const payload: IAdminCouponInput = {
            code: data.code,
            discountType: data.discountType,
            discountValue: Number(data.value),
            expirationDate: data.expirationDate,
            usageLimit: data.usageLimit,
        };

        createMutation.mutate(payload, { onSuccess: () => router.push('/admin-dashboard/coupons') });
    };

    return { form, onSubmit, isCreating: createMutation.isPending };
};
