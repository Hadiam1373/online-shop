import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Typography } from '@/components/ui/typography';

export type TRatingProps = {
    value: number;
    onChange?: (value: number) => void;
    max?: number;
    size?: 'sm' | 'md' | 'lg';
    readOnly?: boolean;
    className?: string;
    showLabel?: boolean;
};

const sizeToClass = (size: TRatingProps['size']) => {
    switch (size) {
        case 'sm':
            return 'size-4';
        case 'lg':
            return 'size-6';
        default:
            return 'size-5';
    }
};

const StarIcon = ({ filled, className }: { filled: boolean; className?: string }) => (
    <svg
        viewBox='0 0 24 24'
        fill='currentColor'
        xmlns='http://www.w3.org/2000/svg'
        className={cn(className, filled ? 'text-amber-400' : 'text-muted-foreground')}
        aria-hidden
    >
        <path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
    </svg>
);

export const Rating: React.FC<TRatingProps> = ({
    value,
    onChange,
    max = 5,
    size = 'md',
    readOnly = false,
    className,
    showLabel = false,
}) => {
    const [hover, setHover] = useState<number | null>(null);

    const handleClick = (i: number) => {
        if (readOnly) return;
        onChange && onChange(i);
    };

    return (
        <div className={cn('flex items-center gap-2', className)} role='group' aria-label='rating'>
            <div className='flex items-center' role='radiogroup' aria-label='Star rating'>
                {Array.from({ length: max }).map((_, idx) => {
                    const i = idx + 1;
                    const filled = hover !== null ? i <= hover : i <= value;
                    return (
                        <button
                            key={i}
                            type='button'
                            aria-pressed={i <= value}
                            aria-label={`${i} of ${max}`}
                            onMouseEnter={() => !readOnly && setHover(i)}
                            onMouseLeave={() => !readOnly && setHover(null)}
                            onFocus={() => !readOnly && setHover(i)}
                            onBlur={() => !readOnly && setHover(null)}
                            onClick={() => handleClick(i)}
                            className={cn('p-1 bg-transparent border-0 cursor-pointer', sizeToClass(size))}
                            disabled={readOnly}
                        >
                            <StarIcon filled={filled} className={sizeToClass(size)} />
                        </button>
                    );
                })}
            </div>
            {showLabel && (
                <Typography variant='body2' as='span' className='text-muted-foreground'>
                    {value}/{max}
                </Typography>
            )}
        </div>
    );
};

export default Rating;
