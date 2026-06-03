import React, { JSX } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

const typographyStyles = cva('', {
    variants: {
        variant: {
            h1: 'text-[72px] leading-[90px]',
            h2: 'text-[64px] leading-[88px]',
            h3: 'text-[48px] leading-[64px]',
            h4: 'text-[40px] leading-[56px]',
            h5: 'text-[32px] leading-[44px]',
            h6: 'text-[24px] leading-[32px]',
            subtitle1: 'text-[20px] leading-[30px]',
            subtitle2: 'text-[18px] leading-[26px]',
            body1: 'text-[16px] leading-[24px]',
            body2: 'text-[14px] leading-[20px]',
            caption: 'text-[12px] leading-[18px]',
            overline: 'text-[10px] leading-[15px]',
        },

        'sm-variant': {
            h1: 'sm:text-[72px] sm:leading-[90px]',
            h2: 'sm:text-[64px] sm:leading-[88px]',
            h3: 'sm:text-[48px] sm:leading-[64px]',
            h4: 'sm:text-[40px] sm:leading-[56px]',
            h5: 'sm:text-[32px] sm:leading-[44px]',
            h6: 'sm:text-[24px] sm:leading-[32px]',
            subtitle1: 'sm:text-[20px] sm:leading-[30px]',
            subtitle2: 'sm:text-[18px] sm:leading-[26px]',
            body1: 'sm:text-[16px] sm:leading-[24px]',
            body2: 'sm:text-[14px] sm:leading-[20px]',
            caption: 'sm:text-[12px] sm:leading-[18px]',
            overline: 'sm:text-[10px] sm:leading-[15px]',
        },

        'md-variant': {
            h1: 'md:text-[72px] md:leading-[90px]',
            h2: 'md:text-[64px] md:leading-[88px]',
            h3: 'md:text-[48px] md:leading-[64px]',
            h4: 'md:text-[40px] md:leading-[56px]',
            h5: 'md:text-[32px] md:leading-[44px]',
            h6: 'md:text-[24px] md:leading-[32px]',
            subtitle1: 'md:text-[20px] md:leading-[30px]',
            subtitle2: 'md:text-[18px] md:leading-[26px]',
            body1: 'md:text-[16px] md:leading-[24px]',
            body2: 'md:text-[14px] md:leading-[20px]',
            caption: 'md:text-[12px] md:leading-[18px]',
            overline: 'md:text-[10px] md:leading-[15px]',
        },

        weight: {
            light: 'font-[300]',
            regular: 'font-[400]',
            medium: 'font-[500]',
            bold: 'font-[700]',
        },

        'sm-weight': {
            light: 'sm:font-[300]',
            regular: 'sm:font-[400]',
            medium: 'sm:font-[500]',
            bold: 'sm:font-[700]',
        },

        'md-weight': {
            light: 'md:font-[300]',
            regular: 'md:font-[400]',
            medium: 'md:font-[500]',
            bold: 'md:font-[700]',
        },
    },

    defaultVariants: {
        variant: 'body1',
        weight: 'regular',
    },
});

type TypographyVariants = {
    [K in keyof VariantProps<typeof typographyStyles>]:
        Exclude<VariantProps<typeof typographyStyles>[K], null>;
};

type TypographyProps<
    T extends React.ElementType = 'p'
> = {
    as?: T;
    children?: React.ReactNode;
    className?: string;
} & React.ComponentPropsWithRef<T> &
    TypographyVariants;

const variantToElementMap: Record<string, React.ElementType> = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    h6: 'h6',
    subtitle1: 'h3',
    subtitle2: 'h4',
    body1: 'p',
    body2: 'p',
    caption: 'p',
    overline: 'span',
};

export const Typography = <
    T extends React.ElementType = 'p'
>({
    as,
    variant = 'body1',
    children,
    className,
    ...props
}: TypographyProps<T>): JSX.Element => {
    const Component =
        as ?? variantToElementMap[variant];

    return (
        <Component
            className={typographyStyles({
                variant,
                className,
                ...props,
            })}
            {...props}
        >
            {children}
        </Component>
    );
};