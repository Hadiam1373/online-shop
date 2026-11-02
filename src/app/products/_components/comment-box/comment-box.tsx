'use client';

import { useComments } from '@/app/user-dashboard/comments/comments.model';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Empty, EmptyContent, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import Rating from '@/components/ui/rating';
import { Textarea } from '@/components/ui/textarea';
import { Typography } from '@/components/ui/typography';
import { useGetProductReview } from '@/lib/api/reviews/reviews.query';
import { useGetProfile } from '@/lib/api/users/users.query';
import { BookOpen } from 'lucide-react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export const CommentBox = () => {
    const params = useParams() as { id?: string };
    const id = params?.id || '';
    const { data: comments } = useGetProductReview({ params: { productId: id } });
    const { data: currentUser } = useGetProfile();
    const haveUserComment = comments?.data?.find(co => co?.user?.id === currentUser?.id);
    const profileComplete = !!currentUser && [
        currentUser.firstName,
        currentUser.lastName,
        currentUser.province,
        currentUser.city,
        currentUser.address,
        currentUser.postalCode,
    ].every(value => typeof value === 'string' && value.trim().length > 0);
    const reviewAction = haveUserComment ? null : profileComplete ? (
        <CreateCommentModal productId={comments?.product?.id ?? id} />
    ) : currentUser ? (
        <div className='flex flex-col gap-2'>
            <Typography variant='caption' className='text-muted-foreground'>
                برای ثبت دیدگاه، ابتدا اطلاعات پروفایل و نشانی خود را کامل کنید.
            </Typography>
            <Button asChild variant='outline' className='max-w-[180px]'>
                <Link href='/user-dashboard'>تکمیل پروفایل</Link>
            </Button>
        </div>
    ) : (
        <Button asChild variant='outline' className='max-w-[180px]'>
            <Link href='/auth/login'>برای ثبت دیدگاه وارد شوید</Link>
        </Button>
    );
    return (
        <Card className='mb-8'>
            {comments?.data?.length ? (
                <>
                    <CardHeader className='w-full flex items-center justify-between py-2'>
                        <Typography weight='bold'>دیدگاه کاربران</Typography>
                        {reviewAction}
                    </CardHeader>
                    <CardContent className='flex flex-col gap-3'>
                        {comments?.data?.map(co => (
                            <div key={co.id} className='flex flex-col gap-2 border border-border rounded-xl p-4 bg-muted/30'>
                                <div className='flex flex-wrap w-full justify-between items-center'>
                                    <Typography className='text-secondary' variant='body2'>
                                        {[co.user?.firstName, co.user?.lastName].filter(Boolean).join(' ') || 'کاربر'}
                                    </Typography>
                                    <Rating value={co?.rating} />
                                </div>
                                <Typography className='text-foreground'>{co.comment}</Typography>
                            </div>
                        ))}
                    </CardContent>
                </>
            ) : (
                <Empty className='p-2'>
                    <EmptyHeader>
                        <EmptyMedia variant='icon'>
                            <BookOpen />
                        </EmptyMedia>
                        <EmptyTitle>
                            <Typography>دیدگاهی جهت نمایش وجود ندارد!</Typography>
                        </EmptyTitle>
                    </EmptyHeader>
                    <EmptyContent>
                        {reviewAction}
                    </EmptyContent>
                </Empty>
            )}
        </Card>
    );
};

const CreateCommentModal = ({ productId }: { productId: string | undefined }) => {
    const { openModal, setOpenModal, methods, ratingValue, onSubmit } = useComments({
        mode: 'create',
        productId,
        loadMyReviews: false,
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
