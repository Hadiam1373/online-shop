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

const Comments = () => {
    const { comments, isPending, page, setPage } = useComments();
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
                    <Card key={item?.id}>
                        <div className='flex gap-4 p-4 items-center'>
                            <img width={100} height={100} src={item?.product?.images![0]} alt='' />
                            <div className='flex-1 text-start'>
                                <Typography variant='subtitle1'>{item?.product?.name}</Typography>
                                <Typography>{item?.comment}</Typography>
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
