import { queryOptions, useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { getAdminOrderStats, getAdminOrders, updateAdminOrderStatus } from './admin.orders.api';
import { IAdminOrder, IAdminOrderListResponse, IAdminOrderStatsResponse, IAdminOrderStatusUpdateRequest } from './admin.orders.dto';

export const useGetAdminOrders = (props?: { queryOptions?: Omit<UseQueryOptions<IAdminOrderListResponse>, 'queryKey'> }) =>
    useQuery(queryOptions({ queryKey: ['admin-orders'] as const, queryFn: () => getAdminOrders(), ...(props?.queryOptions || {}) }));

export const useUpdateAdminOrderStatus = (props?: {
    mutationOptions?: Omit<
        UseMutationOptions<IAdminOrder, unknown, { id: string; payload: IAdminOrderStatusUpdateRequest }>,
        'mutationKey' | 'mutationFn'
    >;
}) =>
    useMutation({
        mutationKey: ['admin-update-order-status'] as const,
        mutationFn: ({ id, payload }: { id: string; payload: IAdminOrderStatusUpdateRequest }) => updateAdminOrderStatus(id, payload),
        ...(props?.mutationOptions || {}),
    });

export const useGetAdminOrderStats = (props?: { queryOptions?: Omit<UseQueryOptions<IAdminOrderStatsResponse>, 'queryKey'> }) =>
    useQuery(
        queryOptions({ queryKey: ['admin-order-stats'] as const, queryFn: () => getAdminOrderStats(), ...(props?.queryOptions || {}) }),
    );
