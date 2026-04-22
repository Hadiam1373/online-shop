import {
  queryOptions,
  useMutation,
  useQuery,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import { createProduct, getProducts } from "./products.api";

type ResponseType = Awaited<ReturnType<typeof getProducts>>;

type ResponsePostType = Awaited<ReturnType<typeof createProduct>>;

export const productsQueryOptions = (props: {
  queryOptions?: Omit<UseQueryOptions<ResponseType>, "queryKey">;
}) => {
  return queryOptions<ResponseType>({
    queryKey: ["products"],
    queryFn: getProducts,
    ...props.queryOptions,
  });
};

export const useProductsQuery = (props: {
  queryOptions?: Omit<UseQueryOptions<ResponseType>, "queryKey">;
}) => {
  return useQuery(productsQueryOptions(props));
};

export const createProductMutationOptions = (props: {
  mutationOptions?: Omit<UseMutationOptions<ResponsePostType>, "mutationFn">;
}) => {
  return {
    mutationFn: createProduct,
    ...props.mutationOptions,
  };
};

export const useCreateProductMutation = (props: {
  mutationOptions?: Omit<UseMutationOptions<ResponsePostType>, "mutationFn">;
}) => {
  return useMutation(createProductMutationOptions(props));
};
