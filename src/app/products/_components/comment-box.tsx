import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { useGetProductReview } from '@/lib/api/reviews/reviews.query';
import { useParams } from 'next/navigation';

export const CommentBox = () => {
    const params = useParams() as { id?: string };
    const id = params?.id || '';
    const { data: comments } = useGetProductReview({ params: { productId: id } });
    console.log(comments);
    return (
        <Card>
            <CardHeader className='w-full flex items-center justify-between py-2'>
                <Typography weight='bold'>دیدگاه کاربران</Typography>
                <Button variant='outline'>ثبت دیدگاه</Button>
            </CardHeader>
        </Card>
    );
};
