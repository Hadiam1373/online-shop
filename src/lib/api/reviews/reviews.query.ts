import { queryOptions, useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { getMyReviews, createReview, deleteReview, editReview, getProductReview } from './reviews.api';
import { IGetMyReviewsParams, IProductReviewResponse, IReviewInput, IUserReviewsResponse } from './reviews.dto';

export const getMyReviewsOptions = (props?: {
    queryOptions?: Omit<UseQueryOptions<IUserReviewsResponse>, 'queryKey'>;
    params?: IGetMyReviewsParams;
}) => {
    return queryOptions({
        queryKey: ['my-reviews'] as const,
        queryFn: () => getMyReviews(props?.params),
        ...(props?.queryOptions || {}),
    });
};

export const useGetMyReviews = (props?: {
    queryOptions?: Omit<UseQueryOptions<IUserReviewsResponse>, 'queryKey'>;
    params?: IGetMyReviewsParams;
}) => {
    return useQuery(getMyReviewsOptions(props));
};

export const useGetProductReviewOption = (props?: {
    queryOptions?: Omit<UseQueryOptions<IProductReviewResponse>, 'queryKey'>;
    params: { productId: string };
}) => {
    return queryOptions({
        queryKey: ['my-reviews', props?.params?.productId] as const,
        queryFn: () => getProductReview(props?.params?.productId!),
        ...(props?.queryOptions || {}),
    });
};

export const useGetProductReview = (props?: {
    queryOptions?: Omit<UseQueryOptions<IProductReviewResponse>, 'queryKey'>;
    params: { productId: string };
}) => {
    return useQuery(useGetProductReviewOption(props));
};

export const createReviewOptions = (props?: {
    mutationOptions?: Omit<UseMutationOptions<any, unknown, IReviewInput>, 'mutationKey' | 'mutationFn'>;
}) => ({
    mutationKey: ['create-review'] as const,
    mutationFn: (payload: IReviewInput) => createReview(payload),
    ...(props?.mutationOptions || {}),
});

export const useCreateReview = (props?: {
    mutationOptions?: Omit<UseMutationOptions<any, unknown, IReviewInput>, 'mutationKey' | 'mutationFn'>;
}) => useMutation(createReviewOptions(props));

export const deleteReviewOptions = (props?: {
    mutationOptions?: Omit<UseMutationOptions<any, unknown, string>, 'mutationKey' | 'mutationFn'>;
}) => ({
    mutationKey: ['delete-review'] as const,
    mutationFn: (reviewId: string) => deleteReview(reviewId),
    ...(props?.mutationOptions || {}),
});

export const useDeleteReview = (props?: {
    mutationOptions?: Omit<UseMutationOptions<any, unknown, string>, 'mutationKey' | 'mutationFn'>;
}) => useMutation(deleteReviewOptions(props));

export const editReviewOptions = (props?: {
    mutationOptions?: Omit<UseMutationOptions<any, unknown, { reviewId: string; payload: IReviewInput }>, 'mutationKey' | 'mutationFn'>;
}) => ({
    mutationKey: ['edit-review'] as const,
    mutationFn: ({ reviewId, payload }: { reviewId: string; payload: IReviewInput }) => editReview(reviewId, payload),
    ...(props?.mutationOptions || {}),
});

export const useEditReview = (props?: {
    mutationOptions?: Omit<UseMutationOptions<any, unknown, { reviewId: string; payload: IReviewInput }>, 'mutationKey' | 'mutationFn'>;
}) => useMutation(editReviewOptions(props));
