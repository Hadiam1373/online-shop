import { queryOptions, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getProducts } from "./products.api";

type ResponseType = Awaited<ReturnType<typeof getProducts>>;

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
