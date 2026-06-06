import {
  queryOptions,
  useMutation,
  useQuery,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import { getMyReviews, createReview } from "./reviews.api";
import { IReviewInput } from "./reviews.dto";

export const getMyReviewsOptions = (props?: {
  queryOptions?: Omit<UseQueryOptions<any>, "queryKey">;
}) => {
  return queryOptions({
    queryKey: ["my-reviews"] as const,
    queryFn: () => getMyReviews(),
    ...(props?.queryOptions || {}),
  });
};

export const useGetMyReviews = (props?: {
  queryOptions?: Omit<UseQueryOptions<any>, "queryKey">;
}) => {
  return useQuery(getMyReviewsOptions(props));
};

export const createReviewOptions = (props?: {
  mutationOptions?: Omit<
    UseMutationOptions<any, unknown, IReviewInput>,
    "mutationKey" | "mutationFn"
  >;
}) => ({
  mutationKey: ["create-review"] as const,
  mutationFn: (payload: IReviewInput) => createReview(payload),
  ...(props?.mutationOptions || {}),
});

export const useCreateReview = (props?: {
  mutationOptions?: Omit<
    UseMutationOptions<any, unknown, IReviewInput>,
    "mutationKey" | "mutationFn"
  >;
}) => useMutation(createReviewOptions(props));
