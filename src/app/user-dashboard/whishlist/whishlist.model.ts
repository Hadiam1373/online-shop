import { useGetWishlist, useRemoveFromWishlist } from '@/lib/api/wishlist';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export const useWishlist = () => {
    const queryClient = useQueryClient();
    const [openModal, setOpenModal] = useState(false);
    const { data: wishlist, isPending } = useGetWishlist();
    const { mutateAsync: removeFromWishlist } = useRemoveFromWishlist();
    const handleremoveWishlist = async (id: string) => {
        await removeFromWishlist({ productId: id });
        await queryClient.invalidateQueries({ queryKey: ['wishlist'] });
        setOpenModal(false);
    };
    return { wishlist, isPending, handleremoveWishlist, openModal, setOpenModal };
};
