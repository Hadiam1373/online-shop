'use client';
import { Skeleton } from '@/components/ui/skeleton';
import styles from './table.module.css';
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { BookOpen } from 'lucide-react';
import { Typography } from '@/components/ui/typography';
import { ReactElement } from 'react';
interface IDesktopTable {
    head: string[];
    isLoading: boolean;
    body: ReactElement;
    isShowEmptyState: boolean;
}

export const DesktopTable = (props: IDesktopTable) => {
    const { body, head, isLoading, isShowEmptyState } = props;
    return (
        <div className={styles['custom_table']}>
            {isLoading ? (
                <div className='flex w-full  flex-col gap-2'>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div className='flex gap-4' key={index}>
                            <Skeleton className='h-4 flex-1' />
                            <Skeleton className='h-4 w-24' />
                            <Skeleton className='h-4 w-20' />
                        </div>
                    ))}
                </div>
            ) : isShowEmptyState ? (
                <Empty>
                    <EmptyHeader>
                        <EmptyMedia variant='icon'>
                            <BookOpen />
                        </EmptyMedia>
                        <EmptyTitle>
                            <Typography>دیتایی برای نمایش موجود نیست</Typography>
                        </EmptyTitle>
                    </EmptyHeader>
                </Empty>
            ) : (
                <table className='w-full text-right'>
                    <thead>
                        <tr className='text-sm text-muted-foreground'>
                            {head?.map(th => (
                                <th>{th}</th>
                            ))}
                        </tr>
                    </thead>
                    {body}
                </table>
            )}
        </div>
    );
};
