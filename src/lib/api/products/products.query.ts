import { queryOptions, useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from './products.api';
import { IProduct, IProductInput, IProductParams, IProductsResponse } from './products.dto';

type ListResponse = IProductsResponse;
type ItemResponse = IProduct;

export const getProductsOptions = (props?: { params?: IProductParams; queryOptions?: Omit<UseQueryOptions<ListResponse>, 'queryKey'> }) => {
    return queryOptions({
        queryKey: ['products'] as const,
        queryFn: () => getProducts(props?.params || {}),
        ...(props?.queryOptions || {}),
    });
};

export const useGetProducts = (props?: { params?: IProductParams; queryOptions?: Omit<UseQueryOptions<ListResponse>, 'queryKey'> }) => {
    return useQuery(getProductsOptions(props));
};

export const getProductOptions = (
    id: string,
    props?: {
        queryOptions?: Omit<UseQueryOptions<ItemResponse>, 'queryKey'>;
    },
) => {
    return queryOptions({
        queryKey: ['product', id] as const,
        queryFn: () => getProduct(id),
        ...(props?.queryOptions || {}),
    });
};

export const useGetProduct = (
    id: string,
    props?: {
        queryOptions?: Omit<UseQueryOptions<ItemResponse>, 'queryKey'>;
    },
) => {
    return useQuery(getProductOptions(id, props));
};

export const createProductOptions = (props?: {
    mutationOptions?: Omit<UseMutationOptions<IProduct, unknown, IProductInput>, 'mutationKey' | 'mutationFn'>;
}) => ({
    mutationKey: ['create-product'] as const,
    mutationFn: (payload: IProductInput) => createProduct(payload),
    ...(props?.mutationOptions || {}),
});

export const useCreateProduct = (props?: {
    mutationOptions?: Omit<UseMutationOptions<IProduct, unknown, IProductInput>, 'mutationKey' | 'mutationFn'>;
}) => useMutation(createProductOptions(props));

export const updateProductOptions = (props?: {
    mutationOptions?: Omit<
        UseMutationOptions<IProduct, unknown, { id: string; payload: Partial<IProductInput> }>,
        'mutationKey' | 'mutationFn'
    >;
}) => ({
    mutationKey: ['update-product'] as const,
    mutationFn: ({ id, payload }: { id: string; payload: Partial<IProductInput> }) => updateProduct(id, payload),
    ...(props?.mutationOptions || {}),
});

export const useUpdateProduct = (props?: {
    mutationOptions?: Omit<
        UseMutationOptions<IProduct, unknown, { id: string; payload: Partial<IProductInput> }>,
        'mutationKey' | 'mutationFn'
    >;
}) => useMutation(updateProductOptions(props));

export const deleteProductOptions = (props?: {
    mutationOptions?: Omit<UseMutationOptions<any, unknown, string>, 'mutationKey' | 'mutationFn'>;
}) => ({
    mutationKey: ['delete-product'] as const,
    mutationFn: (id: string) => deleteProduct(id),
    ...(props?.mutationOptions || {}),
});

export const useDeleteProduct = (props?: {
    mutationOptions?: Omit<UseMutationOptions<any, unknown, string>, 'mutationKey' | 'mutationFn'>;
}) => useMutation(deleteProductOptions(props));
