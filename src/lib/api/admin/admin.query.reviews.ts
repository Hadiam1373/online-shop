import { queryOptions, useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { getAdminPendingReviews, getAdminReviewStats, moderateAdminReview } from './admin.reviews.api';
import {
    IAdminReviewPendingResponse,
    IAdminReviewPendingItem,
    IAdminReviewModerationResponse,
    IAdminReviewStatsResponse,
} from './admin.reviews.dto';

export const useGetAdminPendingReviews = (props?: { queryOptions?: Omit<UseQueryOptions<IAdminReviewPendingResponse>, 'queryKey'> }) =>
    useQuery(
        queryOptions({
            queryKey: ['admin-pending-reviews'] as const,
            queryFn: () => getAdminPendingReviews(),
            ...(props?.queryOptions || {}),
        }),
    );

export const useGetAdminReviewStats = (props?: { queryOptions?: Omit<UseQueryOptions<IAdminReviewStatsResponse>, 'queryKey'> }) =>
    useQuery(
        queryOptions({ queryKey: ['admin-review-stats'] as const, queryFn: () => getAdminReviewStats(), ...(props?.queryOptions || {}) }),
    );

export const useModerateAdminReview = (props?: {
    mutationOptions?: Omit<
        UseMutationOptions<IAdminReviewModerationResponse, unknown, { id: string; approve: boolean }>,
        'mutationKey' | 'mutationFn'
    >;
}) =>
    useMutation({
        mutationKey: ['admin-moderate-review'] as const,
        mutationFn: ({ id, approve }: { id: string; approve: boolean }) => moderateAdminReview(id, approve),
        ...(props?.mutationOptions || {}),
    });
