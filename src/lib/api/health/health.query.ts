import { queryOptions, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getHealth } from "./health.api";

export const getHealthOptions = (props?: {
  queryOptions?: Omit<UseQueryOptions<any>, "queryKey">;
}) => {
  return queryOptions({
    queryKey: ["health"] as const,
    queryFn: () => getHealth(),
    ...(props?.queryOptions || {}),
  });
};

export const useHealth = (props?: {
  queryOptions?: Omit<UseQueryOptions<any>, "queryKey">;
}) => {
  return useQuery(getHealthOptions(props));
};
