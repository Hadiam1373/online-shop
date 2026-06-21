'use client';
import { Typography } from '@/components/ui/typography';
import { useWishlist } from './whishlist.model';
import { HeaderTitle } from '@/components';
import { Card } from '@/components/ui/card';
import styles from '../user-dashboard.module.css';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Pagination } from '@/components/ui/pagination';
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { BookOpen } from 'lucide-react';

const Whishlist = () => {
    const { wishlist, isPending, handleremoveWishlist, openModal, setOpenModal, page, setPage } = useWishlist();
    return (
        <div className={styles['form_wrapper']}>
            <HeaderTitle title='محصولات مورد علاقه' />
            {isPending ? (
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
                    {Array.from({ length: 2 }).map((_, index) => (
                        <Card className='p-4' key={index}>
                            <div className='flex w-full items-center gap-4'>
                                <Skeleton className='size-16 shrink-0 rounded-xl' />
                                <div className='grid flex-1 gap-2'>
                                    <Skeleton className='h-4 w-[150px]' />
                                    <Skeleton className='h-4 w-[100px]' />
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            ) : !wishlist?.data?.length ? (
                <Empty>
                    <EmptyHeader>
                        <EmptyMedia variant='icon'>
                            <BookOpen />
                        </EmptyMedia>
                        <EmptyTitle>
                            <Typography>لیست مورد علاقه ایی موجود نیست</Typography>
                        </EmptyTitle>
                    </EmptyHeader>
                </Empty>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
                    {wishlist?.data?.map(item => (
                        <Card className='p-4' key={item.id}>
                            <div className='flex gap-4 items-center'>
                                <img
                                    src={item.product.images[0]}
                                    alt={item.product.name}
                                    className='size-16 shrink-0 rounded-xl object-cover border border-border'
                                />
                                <div className='flex flex-col gap-1 items-start text-start'>
                                    <Typography variant='subtitle2' weight='bold' className='text-foreground'>
                                        {item?.product?.name}
                                    </Typography>
                                    <Typography variant='body2' className='text-muted-foreground'>
                                        قیمت : {item?.product?.price}
                                    </Typography>
                                </div>
                            </div>
                            <div className='flex flex-wrap lg:flex-nowrap gap-3 items-center mt-4'>
                                <Dialog open={openModal} onOpenChange={setOpenModal}>
                                    <DialogTrigger asChild>
                                        <Button className='w-[150px] md:w-auto' variant='outline'>
                                            حذف از لیست
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                                <Typography>آیا از حذف این محصول از لیست مورد علاقه مطمئن هستید؟</Typography>
                                            </DialogTitle>
                                        </DialogHeader>
                                        <div className='flex gap-2'>
                                            <Button variant='secondary' onClick={() => setOpenModal(false)}>
                                                خیر
                                            </Button>
                                            <Button variant='destructive' onClick={() => handleremoveWishlist(item.product.id)}>
                                                بلی
                                            </Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                                <Button className='w-[150px] md:w-auto'>افزودن به سبد خرید</Button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
            <div className='flex w-full justify-center items-center mt-10'>
                <Pagination currentPage={page} onPageChange={setPage} totalPages={wishlist?.pagination?.pages || 1} />
            </div>
        </div>
    );
};
export default Whishlist;
