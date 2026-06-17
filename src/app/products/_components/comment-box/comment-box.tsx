'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Rating from '@/components/ui/rating';
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
            <CardContent>
                {comments?.data?.map(co => (
                    <div key={co.id} className='flex flex-col gap-2 border rounded-lg p-4'>
                        <div className='flex flex-wrap w-full justify-between items-center'>
                            <Typography className='text-secondary' variant='body2'>
                                {co.user?.email}
                            </Typography>
                            <Rating value={co?.rating} />
                        </div>
                        <Typography>{co.comment}</Typography>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};
