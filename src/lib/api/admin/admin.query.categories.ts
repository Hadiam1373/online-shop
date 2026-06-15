import { queryOptions, useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import {
    createAdminCategory,
    deleteAdminCategory,
    getAdminCategories,
    getAdminCategory,
    updateAdminCategory,
} from './admin.categories.api';
import { IAdminCategoryInput, IAdminCategoryResponse, IAdminCategoryUpdateInput, IAdminCategoriesResponse } from './admin.categories.dto';

export const getAdminCategoriesOptions = (
    page?: number,
    limit?: number,
    props?: { queryOptions?: Omit<UseQueryOptions<IAdminCategoriesResponse>, 'queryKey'> },
) =>
    queryOptions({
        queryKey: ['admin-categories', page, limit] as const,
        queryFn: () => getAdminCategories(page, limit),
        ...(props?.queryOptions || {}),
    });

export const useGetAdminCategories = (
    page?: number,
    limit?: number,
    props?: { queryOptions?: Omit<UseQueryOptions<IAdminCategoriesResponse>, 'queryKey'> },
) => useQuery(getAdminCategoriesOptions(page, limit, props));

export const getAdminCategoryOptions = (id: string, props?: { queryOptions?: Omit<UseQueryOptions<IAdminCategoryResponse>, 'queryKey'> }) =>
    queryOptions({ queryKey: ['admin-category', id] as const, queryFn: () => getAdminCategory(id), ...(props?.queryOptions || {}) });

export const useGetAdminCategory = (id: string, props?: { queryOptions?: Omit<UseQueryOptions<IAdminCategoryResponse>, 'queryKey'> }) =>
    useQuery(getAdminCategoryOptions(id, props));

export const useCreateAdminCategory = (props?: {
    mutationOptions?: Omit<UseMutationOptions<IAdminCategoryResponse, unknown, IAdminCategoryInput>, 'mutationKey' | 'mutationFn'>;
}) =>
    useMutation({
        mutationKey: ['admin-create-category'] as const,
        mutationFn: (payload: IAdminCategoryInput) => createAdminCategory(payload),
        ...(props?.mutationOptions || {}),
    });

export const useUpdateAdminCategory = (props?: {
    mutationOptions?: Omit<
        UseMutationOptions<IAdminCategoryResponse, unknown, { id: string; payload: IAdminCategoryUpdateInput }>,
        'mutationKey' | 'mutationFn'
    >;
}) =>
    useMutation({
        mutationKey: ['admin-update-category'] as const,
        mutationFn: ({ id, payload }: { id: string; payload: IAdminCategoryUpdateInput }) => updateAdminCategory(id, payload),
        ...(props?.mutationOptions || {}),
    });

export const useDeleteAdminCategory = (props?: {
    mutationOptions?: Omit<UseMutationOptions<void, unknown, string>, 'mutationKey' | 'mutationFn'>;
}) =>
    useMutation({
        mutationKey: ['admin-delete-category'] as const,
        mutationFn: (id: string) => deleteAdminCategory(id),
        ...(props?.mutationOptions || {}),
    });
