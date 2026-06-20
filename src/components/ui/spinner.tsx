import { Typography } from '@/components/ui/typography';
import { cn } from '@/lib/utils';
import { Loader2Icon } from 'lucide-react';

function Spinner({ className, ...props }: React.ComponentProps<'svg'>) {
    return (
        <div className='w-full h-screen absolute flex flex-col gap-6 justify-center items-center bg-blend-color'>
            <Loader2Icon
                data-slot='spinner'
                role='status'
                aria-label='Loading'
                className={cn('size-8 animate-spin text-secondary', className)}
                {...props}
            />
            <Typography variant='body1' weight='bold' className='text-secondary'>
                در حال بارگذاری ...
            </Typography>
        </div>
    );
}

export { Spinner };
