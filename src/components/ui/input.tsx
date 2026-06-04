import * as React from 'react';

import { cn } from '@/lib/utils';

interface InputProps extends React.ComponentProps<'input'> {
    error?: string;
}

function Input({ className, type, error, ...props }: InputProps) {
    return (
        <div className={cn('w-full flex flex-col', error && 'mb-1')}>
            <input
                type={type}
                dir='rtl'
                data-slot='input'
                className={cn(
                    'h-9 w-full min-w-0 rounded-3xl border border-transparent bg-input/50 px-3 py-1 text-base text-right transition-[color,box-shadow,background-color] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
                    error && 'border-destructive text-destructive focus-visible:ring-destructive/30',
                    className,
                )}
                {...props}
            />
            {error && <p className='text-destructive text-sm mt-1 text-right'>{error}</p>}
        </div>
    );
}

export { Input };
