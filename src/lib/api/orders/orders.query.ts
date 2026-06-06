import {
  queryOptions,
  useMutation,
  useQuery,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import { createOrder, getOrders, getOrder } from "./orders.api";
import { IOrderCreate, IOrder, IOrderListResponse } from "./orders.dto";

export const createOrderOptions = (props?: {
  mutationOptions?: Omit<
    UseMutationOptions<any, unknown, IOrderCreate>,
    "mutationKey" | "mutationFn"
  >;
}) => ({
  mutationKey: ["create-order"] as const,
  mutationFn: (payload: IOrderCreate) => createOrder(payload),
  ...(props?.mutationOptions || {}),
});

export const useCreateOrder = (props?: {
  mutationOptions?: Omit<
    UseMutationOptions<any, unknown, IOrderCreate>,
    "mutationKey" | "mutationFn"
  >;
}) => useMutation(createOrderOptions(props));

export const getOrdersOptions = (props?: {
  queryOptions?: Omit<UseQueryOptions<IOrderListResponse>, "queryKey">;
}) =>
  queryOptions({
    queryKey: ["orders"] as const,
    queryFn: () => getOrders(),
    ...(props?.queryOptions || {}),
  });

export const useGetOrders = (props?: {
  queryOptions?: Omit<UseQueryOptions<IOrderListResponse>, "queryKey">;
}) => {
  return useQuery(getOrdersOptions(props));
};

export const getOrderOptions = (
  id: string,
  props?: { queryOptions?: Omit<UseQueryOptions<IOrder>, "queryKey"> },
) =>
  queryOptions({
    queryKey: ["order", id] as const,
    queryFn: () => getOrder(id),
    ...(props?.queryOptions || {}),
  });

export const useGetOrder = (
  id: string,
  props?: { queryOptions?: Omit<UseQueryOptions<IOrder>, "queryKey"> },
) => {
  return useQuery(getOrderOptions(id, props));
};
