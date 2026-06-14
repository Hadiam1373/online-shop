import { queryOptions, useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import {
    getDashboardStats,
    getAdminUsers,
    getAdminUser,
    changeUserRole,
    banUser,
    getReportSales,
    getReportProducts,
    getReportInventory,
    getReportCustomers,
} from './admin.api';
import {
    IAdminDashboardStatsResponse,
    IAdminUserListResponse,
    IAdminUserDetailResponse,
    IAdminUserRoleUpdateRequest,
    IAdminUserRoleUpdateResponse,
    IAdminUserBanResponse,
    IAdminReportSalesQueryParams,
    IAdminReportSalesResponse,
    IAdminReportProductsQueryParams,
    IAdminReportProductsResponse,
    IAdminReportInventoryQueryParams,
    IAdminReportInventoryResponse,
    IAdminReportCustomersResponse,
} from './admin.dto';

export const getDashboardStatsOptions = (props?: { queryOptions?: Omit<UseQueryOptions<IAdminDashboardStatsResponse>, 'queryKey'> }) =>
    queryOptions({ queryKey: ['admin-dashboard-stats'] as const, queryFn: () => getDashboardStats(), ...(props?.queryOptions || {}) });

export const useGetDashboardStats = (props?: { queryOptions?: Omit<UseQueryOptions<IAdminDashboardStatsResponse>, 'queryKey'> }) =>
    useQuery(getDashboardStatsOptions(props));

export const getAdminUsersOptions = (props?: { queryOptions?: Omit<UseQueryOptions<IAdminUserListResponse>, 'queryKey'> }) =>
    queryOptions({ queryKey: ['admin-users'] as const, queryFn: () => getAdminUsers(), ...(props?.queryOptions || {}) });

export const useGetAdminUsers = (props?: { queryOptions?: Omit<UseQueryOptions<IAdminUserListResponse>, 'queryKey'> }) =>
    useQuery(getAdminUsersOptions(props));

export const getAdminUserOptions = (
    userId: string,
    props?: { queryOptions?: Omit<UseQueryOptions<IAdminUserDetailResponse>, 'queryKey'> },
) => queryOptions({ queryKey: ['admin-user', userId] as const, queryFn: () => getAdminUser(userId), ...(props?.queryOptions || {}) });

export const useGetAdminUser = (userId: string, props?: { queryOptions?: Omit<UseQueryOptions<IAdminUserDetailResponse>, 'queryKey'> }) =>
    useQuery(getAdminUserOptions(userId, props));

export const changeUserRoleOptions = (props?: {
    mutationOptions?: Omit<
        UseMutationOptions<IAdminUserRoleUpdateResponse, unknown, { userId: string; payload: IAdminUserRoleUpdateRequest }>,
        'mutationKey' | 'mutationFn'
    >;
}) => ({
    mutationKey: ['admin-change-role'] as const,
    mutationFn: ({ userId, payload }: { userId: string; payload: IAdminUserRoleUpdateRequest }) => changeUserRole(userId, payload),
    ...(props?.mutationOptions || {}),
});

export const useChangeUserRole = (props?: {
    mutationOptions?: Omit<
        UseMutationOptions<IAdminUserRoleUpdateResponse, unknown, { userId: string; payload: IAdminUserRoleUpdateRequest }>,
        'mutationKey' | 'mutationFn'
    >;
}) => useMutation(changeUserRoleOptions(props));

export const banUserOptions = (props?: {
    mutationOptions?: Omit<
        UseMutationOptions<IAdminUserBanResponse, unknown, { userId: string; payload: { banned: boolean } }>,
        'mutationKey' | 'mutationFn'
    >;
}) => ({
    mutationKey: ['admin-ban-user'] as const,
    mutationFn: ({ userId, payload }: { userId: string; payload: { banned: boolean } }) => banUser(userId, payload),
    ...(props?.mutationOptions || {}),
});

export const useBanUser = (props?: {
    mutationOptions?: Omit<
        UseMutationOptions<IAdminUserBanResponse, unknown, { userId: string; payload: { banned: boolean } }>,
        'mutationKey' | 'mutationFn'
    >;
}) => useMutation(banUserOptions(props));

export const useGetReportSales = (props?: { queryOptions?: Omit<UseQueryOptions<IAdminReportSalesResponse>, 'queryKey'> }) =>
    useQuery(queryOptions({ queryKey: ['admin-report-sales'] as const, queryFn: () => getReportSales(), ...(props?.queryOptions || {}) }));

export const useGetReportProducts = (props?: { queryOptions?: Omit<UseQueryOptions<IAdminReportProductsResponse>, 'queryKey'> }) =>
    useQuery(
        queryOptions({ queryKey: ['admin-report-products'] as const, queryFn: () => getReportProducts(), ...(props?.queryOptions || {}) }),
    );

export const useGetReportInventory = (props?: { queryOptions?: Omit<UseQueryOptions<IAdminReportInventoryResponse>, 'queryKey'> }) =>
    useQuery(
        queryOptions({
            queryKey: ['admin-report-inventory'] as const,
            queryFn: () => getReportInventory(),
            ...(props?.queryOptions || {}),
        }),
    );

export const useGetReportCustomers = (props?: { queryOptions?: Omit<UseQueryOptions<IAdminReportCustomersResponse>, 'queryKey'> }) =>
    useQuery(
        queryOptions({
            queryKey: ['admin-report-customers'] as const,
            queryFn: () => getReportCustomers(),
            ...(props?.queryOptions || {}),
        }),
    );

export * from './admin.query.categories';
export * from './admin.query.coupons';
export * from './admin.query.orders';
export * from './admin.query.payments';
export * from './admin.query.products';
export * from './admin.query.reviews';
