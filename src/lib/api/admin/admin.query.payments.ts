import { queryOptions, useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { getAdminPayments, getAdminPaymentStats, refundAdminPayment } from './admin.payments.api';
import { IAdminPaymentListResponse, IAdminPaymentStatsResponse, IAdminPaymentRefundResponse } from './admin.payments.dto';

export const useGetAdminPayments = (props?: { queryOptions?: Omit<UseQueryOptions<IAdminPaymentListResponse>, 'queryKey'> }) =>
    useQuery(queryOptions({ queryKey: ['admin-payments'] as const, queryFn: () => getAdminPayments(), ...(props?.queryOptions || {}) }));

export const useGetAdminPaymentStats = (props?: { queryOptions?: Omit<UseQueryOptions<IAdminPaymentStatsResponse>, 'queryKey'> }) =>
    useQuery(
        queryOptions({ queryKey: ['admin-payment-stats'] as const, queryFn: () => getAdminPaymentStats(), ...(props?.queryOptions || {}) }),
    );

export const useRefundAdminPayment = (props?: {
    mutationOptions?: Omit<UseMutationOptions<IAdminPaymentRefundResponse, unknown, string>, 'mutationKey' | 'mutationFn'>;
}) =>
    useMutation({
        mutationKey: ['admin-refund-payment'] as const,
        mutationFn: (paymentId: string) => refundAdminPayment(paymentId),
        ...(props?.mutationOptions || {}),
    });
