'use client';
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Typography } from '@/components/ui/typography';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export type TPaginationProps<T extends React.ElementType = 'button'> = {
    currentPage: number;
    onPageChange: (page: number) => void;
    type?: 'basic' | 'advanced';
    desktopSiblings?: number;
    mobileSiblings?: number;
    showPrevButton?: boolean;
    showNextButton?: boolean;
    showPageNumbers?: boolean;
    as?: T | 'button' | 'a';
    itemProps?: React.ComponentPropsWithoutRef<T> & {
        href?: string | ((pageNumber: number) => string | Record<string, any>);
    };
} & ({ totalCount: number; totalPages?: never; itemsPerPage: number } | { totalCount?: never; totalPages: number; itemsPerPage?: never });

export type TItemComponentProps<T extends React.ElementType> = React.ComponentPropsWithoutRef<T> & {
    className?: string;
    disabled?: boolean;
    onClick?: () => void;
    href?: string | Record<string, any>;
    to?: string | Record<string, any>;
};

export const Pagination = <T extends React.ElementType = 'button'>(props: TPaginationProps<T>) => {
    const {
        currentPage,
        totalPages: externalTotalPages,
        totalCount,
        itemsPerPage = 20,
        onPageChange,
        type = 'basic',
        desktopSiblings = 2,
        mobileSiblings = 1,
        showPrevButton = true,
        showNextButton = true,
        showPageNumbers = true,
        as = 'button',
        itemProps,
    } = props;

    const [isMobile, setIsMobile] = useState(false);
    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const mq = window.matchMedia('(max-width: 767px)');
        setIsMobile(mq.matches);
        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        if (mq.addEventListener) {
            mq.addEventListener('change', handler);
            return () => mq.removeEventListener('change', handler);
        }

        // Fallback for older browsers (Safari < 14)
        mq.addListener?.(handler);
        return () => mq.removeListener?.(handler);
    }, []);

    const totalPages = externalTotalPages || (totalCount ? Math.ceil(totalCount / itemsPerPage) : 0);
    if (totalPages <= 1) return null;

    const siblingsCount = isMobile ? mobileSiblings : desktopSiblings;

    const getVisiblePageRange = (current: number, total: number, siblings: number) => {
        const totalPageNumbers = siblings + 1;
        if (totalPageNumbers >= total) {
            return { leftSiblingIndex: 2, rightSiblingIndex: total - 1 };
        }

        const leftSiblingIndex = Math.max(current - siblings, 1);
        const rightSiblingIndex = Math.min(current + siblings, total);

        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < total - 2;

        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 1 + 2 * siblings;
            if (leftItemCount - current < siblings) leftItemCount++;
            return { leftSiblingIndex: 1, rightSiblingIndex: leftItemCount };
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            let rightItemCount = 1 + 2 * siblings;
            if (rightItemCount - current < siblings) rightItemCount++;
            return { leftSiblingIndex: total - rightItemCount, rightSiblingIndex: total };
        }

        return { leftSiblingIndex, rightSiblingIndex };
    };

    const getPageNumbers = (): (number | string)[] => {
        const pageNumbers: (number | string)[] = [];
        pageNumbers.push(1);
        const { leftSiblingIndex, rightSiblingIndex } = getVisiblePageRange(currentPage, totalPages, siblingsCount);

        if (leftSiblingIndex > 2) pageNumbers.push('...');

        for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
            if (i !== 1 && i !== totalPages) pageNumbers.push(i);
        }

        if (rightSiblingIndex < totalPages - 1) pageNumbers.push('...');
        if (totalPages > 1) pageNumbers.push(totalPages);

        return pageNumbers;
    };

    const renderItemComponent = (pageNumber: number | string, isDisabled = false, pageKey: number, props?: Record<string, any>) => {
        if (pageNumber === '...') {
            return (
                <Typography variant='body2' as='span' className={cn('text-muted-foreground', props?.className)} key={pageKey}>
                    ...
                </Typography>
            );
        }

        const commonProps: any = { ...(itemProps as any), ...props };

        if (as === 'button') {
            return (
                <button
                    key={pageKey}
                    {...commonProps}
                    className={cn(
                        'transition-colors duration-150 p-1 border rounded min-w-7 h-7 flex items-center justify-center text-sm',
                        commonProps.className,
                        pageNumber === currentPage ? 'pointer-events-none bg-muted' : '',
                    )}
                    onClick={() => !isDisabled && typeof pageNumber === 'number' && onPageChange(pageNumber)}
                    disabled={isDisabled}
                >
                    {pageNumber}
                </button>
            );
        }

        if (as === 'a') {
            const href = typeof commonProps.href === 'function' ? commonProps.href(Number(pageNumber)) : commonProps.href;
            return (
                <a
                    key={pageKey}
                    {...commonProps}
                    className={cn(
                        'transition-colors duration-150 p-1 border rounded min-w-7 h-7 flex items-center justify-center text-sm',
                        commonProps.className,
                    )}
                    href={isDisabled ? '#' : `${href ?? ''}?page=${pageNumber}`}
                >
                    {pageNumber}
                </a>
            );
        }

        const Custom = as as React.ElementType;
        return (
            <Custom key={pageKey} {...(commonProps as any)} className={cn(commonProps.className)}>
                {pageNumber}
            </Custom>
        );
    };

    const previousButtonClickHandler = () => {
        if (currentPage === 1) return;
        onPageChange(currentPage - 1);
    };

    const nextButtonClickHandler = () => {
        if (currentPage === totalPages) return;
        onPageChange(currentPage + 1);
    };

    const inputOnchangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value);
        if (value < 1 || value > totalPages || value === currentPage) return;
        if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
        timeoutRef.current = window.setTimeout(() => onPageChange(value), 500);
    };

    const pageNumbers = getPageNumbers();

    return (
        <div className={cn('flex flex-col gap-6 sm:flex-row items-center')} dir='ltr'>
            <div className={cn('flex items-center gap-2')}>
                {showPrevButton && (
                    <button
                        className={cn('p-1 border border-destructive rounded text-destructive disabled:opacity-50')}
                        disabled={currentPage === 1}
                        onClick={previousButtonClickHandler}
                        aria-label='previous page'
                    >
                        <ChevronRight className='size-4 ' />
                    </button>
                )}

                {showPageNumbers &&
                    pageNumbers.map((pageNumber, index) =>
                        renderItemComponent(pageNumber, pageNumber === currentPage, index, {
                            className: cn(
                                'text-center',
                                pageNumber === currentPage ? 'font-medium' : '',
                                pageNumber === '...' ? 'border-0 w-8' : '',
                            ),
                        }),
                    )}

                {showNextButton && (
                    <button
                        className={cn('p-1 border border-destructive rounded text-destructive disabled:opacity-50')}
                        disabled={currentPage === totalPages}
                        onClick={nextButtonClickHandler}
                        aria-label='next page'
                    >
                        <ChevronLeft className='size-4' />
                    </button>
                )}
            </div>

            {type === 'advanced' && (
                <div className='flex items-center gap-2'>
                    <Typography variant='body2' as='span' className='text-muted-foreground'>
                        Go to Page:
                    </Typography>
                    <input
                        type='number'
                        onChange={inputOnchangeHandler}
                        placeholder={String(currentPage)}
                        className='ms-2 me-1 p-1 text-sm border rounded w-16 text-center placeholder:text-muted-foreground'
                    />
                    <Typography variant='body2' as='span' className='text-muted-foreground'>
                        /{totalPages}
                    </Typography>
                </div>
            )}
        </div>
    );
};

export default Pagination;
