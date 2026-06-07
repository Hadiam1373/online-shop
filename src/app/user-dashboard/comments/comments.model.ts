import { useGetMyReviews } from '@/lib/api/reviews/reviews.query';
import { useState } from 'react';

export const useComments = () => {
    const [page, setPage] = useState(1);
    const { data: comments, isPending } = useGetMyReviews({ params: { page, limit: 5 } });

    return { comments, isPending, page, setPage };
};
    