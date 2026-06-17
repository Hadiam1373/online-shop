'use client';

import { useComments } from '@/app/user-dashboard/comments/comments.model';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Rating from '@/components/ui/rating';
import { Textarea } from '@/components/ui/textarea';
import { Typography } from '@/components/ui/typography';
import { useGetProductReview } from '@/lib/api/reviews/reviews.query';
import { useGetProfile } from '@/lib/api/users/users.query';
import { useParams } from 'next/navigation';

export const CommentBox = () => {
    const params = useParams() as { id?: string };
    const id = params?.id || '';
    const { data: comments } = useGetProductReview({ params: { productId: id } });
    const { data: currentUser } = useGetProfile();
    const haveUserComment = comments?.data?.find(co => co?.user?.id === currentUser?.id);
    return (
        <Card>
            <CardHeader className='w-full flex items-center justify-between py-2'>
                <Typography weight='bold'>دیدگاه کاربران</Typography>
                {!haveUserComment && <CreateCommentModal productId={comments?.product?.id} />}
            </CardHeader>
            <CardContent>
                {comments?.data?.map(co => (
                    <div key={co.id} className='flex flex-col gap-2 border rounded-lg p-4'>
                        <div className='flex flex-wrap w-full justify-between items-center'>
                            <Typography className='text-secondary' variant='body2'>
                                {co.user?.email}
                            </Typography>
                            <Rating value={co?.rating} />
                        </div>
                        <Typography>{co.comment}</Typography>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

const CreateCommentModal = ({ productId }: { productId: string | undefined }) => {
    const { openModal, setOpenModal, methods, ratingValue, onSubmit } = useComments({
        mode: 'create',
        productId,
    });

    return (
        <Dialog open={openModal} onOpenChange={setOpenModal}>
            <DialogTrigger asChild>
                <Button variant='outline' className='max-w-[150px] min-w-[80px] md:w-auto'>
                    ثبت دیدگاه
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>
                    <Typography>دیدگاه خود را راجع به محصول بیان کنید</Typography>
                </DialogTitle>
                <form onSubmit={methods.handleSubmit(onSubmit)} className='flex flex-col gap-4 mt-4'>
                    <Textarea placeholder='دیدگاه' {...methods.register('comment')} />
                    <div>
                        <Typography className='mb-2'>چه امتیازی می‌دهید؟</Typography>
                        <Rating value={ratingValue ? ratingValue : 0} onChange={value => methods.setValue('rating', value)} />
                    </div>
                    <div className='flex gap-2 mt-2'>
                        <Button type='submit' disabled={!methods.formState.isDirty}>
                            ذخیره
                        </Button>
                        <Button variant='secondary'>انصراف</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
