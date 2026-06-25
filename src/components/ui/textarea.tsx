import { Typography } from '@/components/ui/typography';
import { cn } from '@/lib/utils';
import { TextareaHTMLAttributes } from 'react';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    className?: string;
    error?: string;
    label?: string;
};

function Textarea({ className, error, label, ...props }: TextareaProps) {
    return (
        <div className={cn('w-full flex flex-col', error && 'mb-1')}>
            {label ? <Typography variant='caption'>{label}</Typography> : null}
            <textarea
                data-slot='textarea'
                className={cn(
                    'flex field-sizing-content min-h-16 w-full resize-none border border-transparent bg-input/50 px-3 py-2 text-base text-right transition-[color,box-shadow,background-color] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 rounded-lg',
                    error && 'border-destructive text-destructive focus-visible:ring-destructive/30',
                    className,
                )}
                {...props}
            />
            {error && <p className='text-destructive text-sm mt-1 text-right'>{error}</p>}
        </div>
    );
}

export { Textarea };
