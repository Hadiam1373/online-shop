import { queryOptions, useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { createOrder, getOrders, getOrder, cancelOrder } from './orders.api';
import { IOrderCreate, IOrder, IOrderListResponse, IGetOrdersParams } from './orders.dto';

export const createOrderOptions = (props?: {
    mutationOptions?: Omit<UseMutationOptions<any, unknown, IOrderCreate>, 'mutationKey' | 'mutationFn'>;
}) => ({
    mutationKey: ['create-order'] as const,
    mutationFn: (payload: IOrderCreate) => createOrder(payload),
    ...(props?.mutationOptions || {}),
});

export const useCreateOrder = (props?: {
    mutationOptions?: Omit<UseMutationOptions<any, unknown, IOrderCreate>, 'mutationKey' | 'mutationFn'>;
}) => useMutation(createOrderOptions(props));

export const getOrdersOptions = (props?: {
    queryOptions?: Omit<UseQueryOptions<IOrderListResponse>, 'queryKey'>;
    params: IGetOrdersParams;
}) =>
    queryOptions({
        queryKey: ['orders', props?.params] as const,
        queryFn: () => getOrders(props?.params || { page: 1, limit: 10 }),
        ...(props?.queryOptions || {}),
    });

export const useGetOrders = (props?: {
    queryOptions?: Omit<UseQueryOptions<IOrderListResponse>, 'queryKey'>;
    params: IGetOrdersParams;
}) => {
    return useQuery(getOrdersOptions(props));
};

export const getOrderOptions = (id: string, props?: { queryOptions?: Omit<UseQueryOptions<IOrder>, 'queryKey'> }) =>
    queryOptions({
        queryKey: ['order', id] as const,
        queryFn: () => getOrder(id),
        ...(props?.queryOptions || {}),
    });

export const useGetOrder = (id: string, props?: { queryOptions?: Omit<UseQueryOptions<IOrder>, 'queryKey'> }) => {
    return useQuery(getOrderOptions(id, props));
};

export const cancelOrderOptions = (props?: {
    mutationOptions?: Omit<UseMutationOptions<void, unknown, string>, 'mutationKey' | 'mutationFn'>;
}) => ({
    mutationKey: ['cancel-order'] as const,
    mutationFn: (id: string) => cancelOrder(id),
    ...(props?.mutationOptions || {}),
});

export const useCancelOrder = (props?: {
    mutationOptions?: Omit<UseMutationOptions<void, unknown, string>, 'mutationKey' | 'mutationFn'>;
}) => useMutation(cancelOrderOptions(props));
