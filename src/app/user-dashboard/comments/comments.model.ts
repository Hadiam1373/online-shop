import { useCreateReview, useDeleteReview, useEditReview, useGetMyReviews } from '@/lib/api/reviews/reviews.query';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const useComments = ({
    comment,
    rating,
    productId,
    reviewId,
    mode = 'edit',
}: {
    comment?: string;
    rating?: number;
    productId?: string;
    reviewId?: string;
    mode?: 'edit' | 'create';
}) => {
    const [page, setPage] = useState(1);
    const [openModal, setOpenModal] = useState(false);
    const [openRemoveModal, setOpenRemoveModal] = useState(false);
    const { data: comments, isPending } = useGetMyReviews({ params: { page, limit: 5 } });
    const queryClient = useQueryClient();
    const { mutateAsync: editReview } = useEditReview();
    const { mutateAsync: deleteReview } = useDeleteReview();
    const { mutateAsync: createReview } = useCreateReview();

    const methods = useForm({
        defaultValues: {
            comment: comment,
            rating: rating,
        },
    });

    const ratingValue = methods.watch('rating');

    const onSubmit = async (data: any) => {
        if (mode === 'edit') {
            await editReview({
                reviewId: reviewId ? reviewId : '',
                payload: { comment: data.comment, rating: data.rating, productId: productId ? productId : '' },
            });
        }
        await createReview({
            comment: data.comment,
            rating: data.rating,
            productId: productId ? productId : '',
        });
        await queryClient.invalidateQueries({ queryKey: ['my-reviews'] });
        setOpenModal(false);
    };

    const onDelete = async (reviewId: string) => {
        await deleteReview(reviewId);
        await queryClient.invalidateQueries({ queryKey: ['my-reviews'] });
        setOpenRemoveModal(false);
    };

    return {
        comments,
        isPending,
        page,
        setPage,
        openModal,
        setOpenModal,
        openRemoveModal,
        setOpenRemoveModal,
        methods,
        ratingValue,
        onSubmit,
        onDelete,
    };
};
