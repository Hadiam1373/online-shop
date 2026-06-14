import { IHeaderTitleProps } from '@/components/header-title/header-title.dto';
import { Typography } from '@/components/ui/typography';

export const HeaderTitle = (props: IHeaderTitleProps) => {
    const { title, children } = props;
    return (
        <div className='flex items-center justify-between w-full border-b py-4 mb-6'>
            <Typography variant='subtitle2' md-variant='subtitle1' lg-variant='h6' className='text-start font-bold'>
                {title}
            </Typography>
            {children}
        </div>
    );
};
