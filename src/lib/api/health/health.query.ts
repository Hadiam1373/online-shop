import { queryOptions, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getHealth } from "./health.api";
import { IHealthResponse } from "./health.dto";

export const getHealthOptions = (props?: {
  queryOptions?: Omit<UseQueryOptions<IHealthResponse>, "queryKey">;
}) => {
  return queryOptions({
    queryKey: ["health"] as const,
    queryFn: () => getHealth(),
    ...(props?.queryOptions || {}),
  });
};

export const useHealth = (props?: {
  queryOptions?: Omit<UseQueryOptions<IHealthResponse>, "queryKey">;
}) => {
  return useQuery(getHealthOptions(props));
};
