import { IHeaderTitleProps } from '@/components/header-title/header-title.dto';
import { Typography } from '@/components/ui/typography';

export const HeaderTitle = (props: IHeaderTitleProps) => {
    const { title, children } = props;
    return (
        <div className='flex flex-wrap items-center justify-between gap-3 w-full border-b border-border pb-5 mb-6'>
            <Typography variant='subtitle2' md-variant='subtitle1' lg-variant='h6' className='text-start font-bold text-foreground'>
                {title}
            </Typography>
            {children}
        </div>
    );
};
