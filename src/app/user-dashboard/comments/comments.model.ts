import { useGetMyReviews } from '@/lib/api/reviews/reviews.query';

export const useComments = () => {
    const { data: comments , isPending} = useGetMyReviews();

    return { comments , isPending };
};
