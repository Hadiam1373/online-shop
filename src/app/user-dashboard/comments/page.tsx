'use client';
import { HeaderTitle } from '@/components';
import styles from '../user-dashboard.module.css';
import { Card } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { useComments } from './comments.model';
import { Skeleton } from '@/components/ui/skeleton';
import Pagination from '@/components/ui/pagination';
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import Rating from '@/components/ui/rating';

const Comments = () => {
    const { comments, isPending, page, setPage } = useComments({});
    return (
        <div className={styles['form_wrapper']}>
            <HeaderTitle title='نظرات کاربر' />
            {isPending ? (
                <div className='flex flex-col gap-4'>
                    {Array.from({ length: 3 }).map((_, index) => (
                        <Card key={index} className='p-4'>
                            <div className='flex w-full items-center gap-4'>
                                <Skeleton className='size-16 shrink-0 rounded-xl' />
                                <div className='grid flex-1 gap-2'>
                                    <Skeleton className='h-4 w-[150px]' />
                                    <Skeleton className='h-4 w-[300px]' />
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            ) : !comments?.data?.length ? (
                <Empty>
                    <EmptyHeader>
                        <EmptyMedia variant='icon'>
                            <BookOpen />
                        </EmptyMedia>
                        <EmptyTitle>
                            <Typography>نظری موجود نیست</Typography>
                        </EmptyTitle>
                    </EmptyHeader>
                </Empty>
            ) : (
                <div className='flex flex-col gap-4'>
                    {comments?.data?.map(item => (
                        <Card key={item?.id} className='p-4'>
                            <div className='flex items-center justify-between gap-4 flex-wrap md:flex-nowrap'>
                                <div className='flex items-center gap-4'>
                                    <img
                                        className='size-[60px] md:size-[90px] rounded-xl object-cover border border-border'
                                        src={item?.product?.images![0]}
                                        alt={item?.product?.name || ''}
                                    />
                                    <div className='flex-1 text-start'>
                                        <Typography variant='subtitle1' weight='bold' className='text-foreground'>
                                            {item?.product?.name}
                                        </Typography>
                                        <Typography variant='body2' className='text-muted-foreground'>
                                            {item?.comment}
                                        </Typography>
                                    </div>
                                </div>
                                <div className='flex w-full items-center gap-2 md:w-fit'>
                                    <EditCommentModal
                                        comment={item?.comment ? item?.comment : ''}
                                        rating={item?.rating || 0}
                                        productId={item?.product?.id || ''}
                                        reviewId={item?.id || ''}
                                    />
                                    <RemoveCommentModal reviewId={item?.id || ''} />
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            <div className='flex w-full justify-center items-center mt-10'>
                <Pagination currentPage={page} onPageChange={setPage} totalPages={comments?.pagination?.pages || 1} />
            </div>
        </div>
    );
};
export default Comments;

const EditCommentModal = ({
    comment,
    rating,
    productId,
    reviewId,
}: {
    comment: string;
    rating: number;
    productId: string;
    reviewId: string;
}) => {
    const { openModal, setOpenModal, methods, ratingValue, onSubmit } = useComments({ comment, rating, productId, reviewId });

    return (
        <Dialog open={openModal} onOpenChange={setOpenModal}>
            <DialogTrigger asChild>
                <Button variant='outline' size='sm' className='max-w-[150px] min-w-[80px] md:w-auto'>
                    ویرایش
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>
                    <Typography>ویرایش نظر</Typography>
                </DialogTitle>
                <form onSubmit={methods.handleSubmit(onSubmit)} className='flex flex-col gap-4 mt-4'>
                    <Textarea placeholder='ویرایش نظر' {...methods.register('comment')} />
                    <div>
                        <Typography className='mb-2 text-muted-foreground'>چه امتیازی می‌دهید؟</Typography>
                        <Rating value={ratingValue ? ratingValue : 0} onChange={value => methods.setValue('rating', value)} />
                    </div>
                    <div className='flex gap-2 mt-2'>
                        <Button type='submit' disabled={!methods.formState.isDirty}>
                            ذخیره
                        </Button>
                        <Button variant='secondary' type='button'>
                            انصراف
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

const RemoveCommentModal = ({ reviewId }: { reviewId: string }) => {
    const { openRemoveModal, setOpenRemoveModal, onDelete } = useComments({ reviewId });

    return (
        <Dialog open={openRemoveModal} onOpenChange={setOpenRemoveModal}>
            <DialogTrigger asChild>
                <Button variant='destructive' size='sm' className='max-w-[150px] min-w-[80px] md:w-auto'>
                    حذف
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>
                    <Typography>آیا از حذف این نظر اطمینان دارید؟</Typography>
                </DialogTitle>
                <div className='flex gap-2 mt-2'>
                    <Button variant='secondary' type='button'>
                        انصراف
                    </Button>
                    <Button variant='destructive' type='submit' onClick={() => onDelete(reviewId)}>
                        حذف
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
