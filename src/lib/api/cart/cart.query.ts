import {
  queryOptions,
  useMutation,
  useQuery,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import {
  getCart,
  addToCart,
  clearCart,
  calculateCartTotal,
  updateCartItem,
  removeCartItem,
} from "./cart.api";
import { ICartItemInput } from "./cart.dto";

export const getCartOptions = (props?: {
  queryOptions?: Omit<UseQueryOptions<any>, "queryKey">;
}) =>
  queryOptions({
    queryKey: ["cart"] as const,
    queryFn: () => getCart(),
    ...(props?.queryOptions || {}),
  });

export const useGetCart = (props?: {
  queryOptions?: Omit<UseQueryOptions<any>, "queryKey">;
}) => {
  return useQuery(getCartOptions(props));
};

export const addToCartOptions = (props?: {
  mutationOptions?: Omit<
    UseMutationOptions<any, unknown, ICartItemInput>,
    "mutationKey" | "mutationFn"
  >;
}) => ({
  mutationKey: ["add-to-cart"] as const,
  mutationFn: (payload: ICartItemInput) => addToCart(payload),
  ...(props?.mutationOptions || {}),
});

export const useAddToCart = (props?: {
  mutationOptions?: Omit<
    UseMutationOptions<any, unknown, ICartItemInput>,
    "mutationKey" | "mutationFn"
  >;
}) => useMutation(addToCartOptions(props));

export const clearCartOptions = (props?: {
  mutationOptions?: Omit<
    UseMutationOptions<any, unknown, void>,
    "mutationKey" | "mutationFn"
  >;
}) => ({
  mutationKey: ["clear-cart"] as const,
  mutationFn: () => clearCart(),
  ...(props?.mutationOptions || {}),
});

export const useClearCart = (props?: {
  mutationOptions?: Omit<
    UseMutationOptions<any, unknown, void>,
    "mutationKey" | "mutationFn"
  >;
}) => useMutation(clearCartOptions(props));

export const calculateCartTotalOptions = (props?: {
  mutationOptions?: Omit<
    UseMutationOptions<any, unknown, any>,
    "mutationKey" | "mutationFn"
  >;
}) => ({
  mutationKey: ["calculate-cart-total"] as const,
  mutationFn: (payload: any) => calculateCartTotal(payload),
  ...(props?.mutationOptions || {}),
});

export const useCalculateCartTotal = (props?: {
  mutationOptions?: Omit<
    UseMutationOptions<any, unknown, any>,
    "mutationKey" | "mutationFn"
  >;
}) => useMutation(calculateCartTotalOptions(props));

export const updateCartItemOptions = (props?: {
  mutationOptions?: Omit<
    UseMutationOptions<
      any,
      unknown,
      { id: string; payload: { quantity: number } }
    >,
    "mutationKey" | "mutationFn"
  >;
}) => ({
  mutationKey: ["update-cart-item"] as const,
  mutationFn: ({
    id,
    payload,
  }: {
    id: string;
    payload: { quantity: number };
  }) => updateCartItem(id, payload),
  ...(props?.mutationOptions || {}),
});

export const useUpdateCartItem = (props?: {
  mutationOptions?: Omit<
    UseMutationOptions<
      any,
      unknown,
      { id: string; payload: { quantity: number } }
    >,
    "mutationKey" | "mutationFn"
  >;
}) => useMutation(updateCartItemOptions(props));

export const removeCartItemOptions = (props?: {
  mutationOptions?: Omit<
    UseMutationOptions<any, unknown, string>,
    "mutationKey" | "mutationFn"
  >;
}) => ({
  mutationKey: ["remove-cart-item"] as const,
  mutationFn: (id: string) => removeCartItem(id),
  ...(props?.mutationOptions || {}),
});

export const useRemoveCartItem = (props?: {
  mutationOptions?: Omit<
    UseMutationOptions<any, unknown, string>,
    "mutationKey" | "mutationFn"
  >;
}) => useMutation(removeCartItemOptions(props));
