import { queryOptions, useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { createAdminProduct, deleteAdminProduct, getAdminProduct, getAdminProducts, updateAdminProduct } from './admin.products.api';
import { IAdminProductInput, IAdminProductResponse, IAdminProductsFilters, IAdminProductsResponse } from './admin.products.dto';

export const getAdminProductsOptions = (
    page: number,
    limit: number,
    filters?: IAdminProductsFilters,
    props?: { queryOptions?: Omit<UseQueryOptions<IAdminProductsResponse>, 'queryKey'> },
) =>
    queryOptions({
        queryKey: ['admin-products', page, limit, filters] as const,
        queryFn: () => getAdminProducts(page, limit, filters),
        ...(props?.queryOptions || {}),
    });

export const useGetAdminProducts = (
    page: number,
    limit: number,
    filters?: IAdminProductsFilters,
    props?: { queryOptions?: Omit<UseQueryOptions<IAdminProductsResponse>, 'queryKey'> },
) =>
    useQuery(
        getAdminProductsOptions(page, limit, filters, { ...props, queryOptions: { ...props?.queryOptions, staleTime: 1000 * 60 * 5 } }),
    );

export const getAdminProductOptions = (id: string, props?: { queryOptions?: Omit<UseQueryOptions<IAdminProductResponse>, 'queryKey'> }) =>
    queryOptions({ queryKey: ['admin-product', id] as const, queryFn: () => getAdminProduct(id), ...(props?.queryOptions || {}) });

export const useGetAdminProduct = (id: string, props?: { queryOptions?: Omit<UseQueryOptions<IAdminProductResponse>, 'queryKey'> }) =>
    useQuery(getAdminProductOptions(id, props));

export const useCreateAdminProduct = (props?: {
    mutationOptions?: Omit<UseMutationOptions<IAdminProductResponse, unknown, IAdminProductInput>, 'mutationKey' | 'mutationFn'>;
}) =>
    useMutation({
        mutationKey: ['admin-create-product'] as const,
        mutationFn: (payload: IAdminProductInput) => createAdminProduct(payload),
        ...(props?.mutationOptions || {}),
    });

export const useUpdateAdminProduct = (props?: {
    mutationOptions?: Omit<
        UseMutationOptions<IAdminProductResponse, unknown, { id: string; payload: IAdminProductInput }>,
        'mutationKey' | 'mutationFn'
    >;
}) =>
    useMutation({
        mutationKey: ['admin-update-product'] as const,
        mutationFn: ({ id, payload }: { id: string; payload: IAdminProductInput }) => updateAdminProduct(id, payload),
        ...(props?.mutationOptions || {}),
    });

export const useDeleteAdminProduct = (props?: {
    mutationOptions?: Omit<UseMutationOptions<void, unknown, string>, 'mutationKey' | 'mutationFn'>;
}) =>
    useMutation({
        mutationKey: ['admin-delete-product'] as const,
        mutationFn: (id: string) => deleteAdminProduct(id),
        ...(props?.mutationOptions || {}),
    });
