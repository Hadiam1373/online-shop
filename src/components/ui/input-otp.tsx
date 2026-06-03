'use client';

import * as React from 'react';
import { OTPInput, OTPInputContext } from 'input-otp';

import { cn } from '@/lib/utils';
import { MinusIcon } from 'lucide-react';

function useIsRtl() {
    const [isRtl, setIsRtl] = React.useState(false);

    React.useEffect(() => {
        try {
            const dir = document?.dir || document?.documentElement?.dir;
            setIsRtl(dir === 'rtl');
        } catch (e) {
            setIsRtl(false);
        }
    }, []);

    return isRtl;
}

function InputOTP({
    className,
    containerClassName,
    ...props
}: React.ComponentProps<typeof OTPInput> & {
    containerClassName?: string;
}) {
    const isRtl = useIsRtl();

    return (
        <OTPInput
            data-slot='input-otp'
            containerClassName={cn(
                'cn-input-otp flex items-center has-disabled:opacity-50',
                isRtl && 'flex-row-reverse',
                containerClassName,
            )}
            dir={isRtl ? 'rtl' : 'ltr'}
            spellCheck={false}
            className={cn('disabled:cursor-not-allowed', className)}
            {...props}
        />
    );
}

function InputOTPGroup({ className, ...props }: React.ComponentProps<'div'>) {
    const isRtl = useIsRtl();

    return (
        <div
            data-slot='input-otp-group'
            className={cn(
                'flex items-center rounded-3xl has-aria-invalid:border-destructive has-aria-invalid:ring-3 has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40',
                isRtl && 'flex-row-reverse',
                className,
            )}
            {...props}
        />
    );
}

function InputOTPSlot({
    index,
    className,
    ...props
}: React.ComponentProps<'div'> & {
    index: number;
}) {
    const inputOTPContext = React.useContext(OTPInputContext);
    const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};
    const isRtl = useIsRtl();
    return (
        <div
            data-slot='input-otp-slot'
            data-active={isActive}
            className={cn(
                'relative flex size-9 items-center justify-center border-y border-input bg-input/50 text-sm transition-all outline-none aria-invalid:border-destructive data-[active=true]:z-10 data-[active=true]:border-ring data-[active=true]:ring-3 data-[active=true]:ring-ring/30 data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40',
                isRtl
                    ? 'border first:rounded-l-3xl last:border-r last:rounded-r-3xl'
                    : 'border-r first:rounded-l-3xl first:border-l last:rounded-r-3xl',
                className,
            )}
            {...props}
        >
            {char}
            {hasFakeCaret && (
                <div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
                    <div className='h-4 w-px animate-caret-blink bg-foreground duration-1000' />
                </div>
            )}
        </div>
    );
}

function InputOTPSeparator({ ...props }: React.ComponentProps<'div'>) {
    return (
        <div data-slot='input-otp-separator' className="flex items-center [&_svg:not([class*='size-'])]:size-4" role='separator' {...props}>
            <MinusIcon />
        </div>
    );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
