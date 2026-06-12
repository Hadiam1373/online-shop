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
                <Card>
                    <div className='flex w-full items-center gap-4 p-4'>
                        <Skeleton className='size-10 shrink-0 rounded-lg' />
                        <div className='grid gap-2'>
                            <Skeleton className='h-4 w-[150px]' />
                            <Skeleton className='h-4 w-[300px]' />
                        </div>
                    </div>
                </Card>
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
                comments?.data?.map(item => (
                    <Card key={item?.id} className='mt-4'>
                        <div className='flex p-4 items-center justify-between flex-wrap md:flex-nowrap'>
                            <div className='flex items-center gap-4'>
                                <img width={100} height={100} src={item?.product?.images![0]} alt='' />
                                <div className='flex-1 text-start'>
                                    <Typography variant='subtitle1'>{item?.product?.name}</Typography>
                                    <Typography>{item?.comment}</Typography>
                                </div>
                            </div>
                            <div className='flex w-full items-center gap-4 md:w-fit'>
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
                ))
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
                <Button className='w-[40%] md:w-auto'>ویرایش</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>
                    <Typography>ویرایش نظر</Typography>
                </DialogTitle>
                <form onSubmit={methods.handleSubmit(onSubmit)} className='flex flex-col gap-4 mt-4'>
                    <Textarea placeholder='ویرایش نظر' {...methods.register('comment')} />
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

const RemoveCommentModal = ({ reviewId }: { reviewId: string }) => {
    const { openRemoveModal, setOpenRemoveModal, onDelete } = useComments({ reviewId });

    return (
        <Dialog open={openRemoveModal} onOpenChange={setOpenRemoveModal}>
            <DialogTrigger asChild>
                <Button variant='secondary' className='w-[40%] md:w-auto'>
                    حذف
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>
                    <Typography>آیا از حذف این نظر اطمینان دارید؟</Typography>
                </DialogTitle>
                <div className='flex gap-2 mt-2'>
                    <Button variant='secondary'>انصراف</Button>
                    <Button type='submit' onClick={() => onDelete(reviewId)}>
                        حذف
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
