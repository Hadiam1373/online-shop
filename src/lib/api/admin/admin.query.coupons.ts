import { queryOptions, useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { createAdminCoupon, deleteAdminCoupon, getAdminCouponStats, getAdminCoupons, updateAdminCoupon } from './admin.coupons.api';
import {
    IAdminCoupon,
    IAdminCouponInput,
    IAdminCouponStatsResponse,
    IAdminCouponUpdateInput,
    IAdminCouponsResponse,
} from './admin.coupons.dto';

export const useGetAdminCoupons = (
    page?: number,
    limit?: number,
    props?: { queryOptions?: Omit<UseQueryOptions<IAdminCouponsResponse>, 'queryKey'> },
) =>
    useQuery(
        queryOptions({
            queryKey: ['admin-coupons', page, limit] as const,
            queryFn: () => getAdminCoupons(page, limit),
            ...(props?.queryOptions || {}),
        }),
    );

export const useGetAdminCouponStats = (props?: { queryOptions?: Omit<UseQueryOptions<IAdminCouponStatsResponse>, 'queryKey'> }) =>
    useQuery(
        queryOptions({ queryKey: ['admin-coupon-stats'] as const, queryFn: () => getAdminCouponStats(), ...(props?.queryOptions || {}) }),
    );

export const useCreateAdminCoupon = (props?: {
    mutationOptions?: Omit<UseMutationOptions<IAdminCoupon, unknown, IAdminCouponInput>, 'mutationKey' | 'mutationFn'>;
}) =>
    useMutation({
        mutationKey: ['admin-create-coupon'] as const,
        mutationFn: (payload: IAdminCouponInput) => createAdminCoupon(payload),
        ...(props?.mutationOptions || {}),
    });

export const useUpdateAdminCoupon = (props?: {
    mutationOptions?: Omit<
        UseMutationOptions<IAdminCoupon, unknown, { id: string; payload: IAdminCouponUpdateInput }>,
        'mutationKey' | 'mutationFn'
    >;
}) =>
    useMutation({
        mutationKey: ['admin-update-coupon'] as const,
        mutationFn: ({ id, payload }: { id: string; payload: IAdminCouponUpdateInput }) => updateAdminCoupon(id, payload),
        ...(props?.mutationOptions || {}),
    });

export const useDeleteAdminCoupon = (props?: {
    mutationOptions?: Omit<UseMutationOptions<void, unknown, string>, 'mutationKey' | 'mutationFn'>;
}) =>
    useMutation({
        mutationKey: ['admin-delete-coupon'] as const,
        mutationFn: (id: string) => deleteAdminCoupon(id),
        ...(props?.mutationOptions || {}),
    });
