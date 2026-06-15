import { ReactNode } from 'react';
import { Typography } from '@/components/ui/typography';
import { Skeleton } from '@/components/ui/skeleton';
import Pagination from '@/components/ui/pagination';
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { BookOpen } from 'lucide-react';
import styles from './table.module.css';

type Field = {
    label: string;
    value: ReactNode;
};

type MobileCardItem = {
    id: string | number;
    fields: Field[];
    actions?: ReactNode;
};

type MobileCardTableProps = {
    data?: MobileCardItem[];
    loading?: boolean;
    emptyText?: string;

    page?: number;
    totalPages?: number;
    onPageChange?: (page: number) => void;
};

export const MobileCardTable = ({
    data = [],
    loading,
    emptyText = 'موردی موجود نیست',
    page,
    totalPages,
    onPageChange,
}: MobileCardTableProps) => {
    if (loading) {
        return (
            <div className='flex flex-col gap-2'>
                {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className='h-[300px]' />
                ))}
            </div>
        );
    }

    if (!data.length) {
        return (
            <Empty>
                <EmptyHeader>
                    <EmptyMedia variant='icon'>
                        <BookOpen />
                    </EmptyMedia>

                    <EmptyTitle>
                        <Typography>{emptyText}</Typography>
                    </EmptyTitle>
                </EmptyHeader>
            </Empty>
        );
    }

    return (
        <div className={styles.mobile_table}>
            {data.map(item => (
                <div key={item.id + Math.random().toString()} className={styles['mobile_table--item']}>
                    {item.fields.map(field => (
                        <div key={field.label} className={styles['mobile_table--item_row']}>
                            <Typography variant='body2' className='text-secondary'>
                                {field.label}
                            </Typography>

                            <Typography variant='body1' weight='bold' className='text-accent-foreground text-end'>
                                {field.value}
                            </Typography>
                        </div>
                    ))}

                    {item.actions && (
                        <div className={styles['mobile_table--item_row']}>
                            <Typography variant='body2' className='text-secondary'>
                                عملیات
                            </Typography>

                            {item.actions}
                        </div>
                    )}
                </div>
            ))}

            {page && totalPages && onPageChange && (
                <div className='flex justify-center items-center mt-10 mb-5'>
                    <Pagination currentPage={page} totalPages={totalPages} onPageChange={onPageChange} />
                </div>
            )}
        </div>
    );
};
