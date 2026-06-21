import { Typography } from '@/components/ui/typography';
import styles from './mobile-table.module.css';
import { useOrders } from '@/app/user-dashboard/orders/orders.model';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Pagination from '@/components/ui/pagination';
import { Skeleton } from '@/components/ui/skeleton';
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { BookOpen } from 'lucide-react';

export const OrderMobileTable = () => {
    const { orders, isPending, currentOrderStatus, handleCancelOrder, openModal, setOpenModal, page, setPage } = useOrders();
    return (
        <div className={styles['mobile_table']}>
            {isPending ? (
                <div className='flex w-full flex-col gap-4'>
                    {Array.from({ length: 3 }).map((_, index) => (
                        <Skeleton className='h-[220px] w-full rounded-2xl' key={index} />
                    ))}
                </div>
            ) : !orders?.data?.length ? (
                <Empty>
                    <EmptyHeader>
                        <EmptyMedia variant='icon'>
                            <BookOpen />
                        </EmptyMedia>
                        <EmptyTitle>
                            <Typography>سفارشی موجود نیست</Typography>
                        </EmptyTitle>
                    </EmptyHeader>
                </Empty>
            ) : (
                orders?.data?.map(order =>
                    order?.orderItems?.map(orderItem => (
                        <div key={orderItem?.productId} className={styles['mobile_table--item']}>
                            <div className={styles['mobile_table--item_row']}>
                                <Typography variant='body2' className='text-secondary'>
                                    نام محصول
                                </Typography>
                                <Typography variant='body2' className='text-accent-foreground text-end' weight='bold'>
                                    {orderItem?.product?.name}
                                </Typography>
                            </div>

                            <div className={styles['mobile_table--item_row']}>
                                <Typography variant='body2' className='text-secondary'>
                                    قیمت
                                </Typography>
                                <Typography variant='body1' className='text-accent-foreground text-end' weight='bold'>
                                    {orderItem?.price}
                                </Typography>
                            </div>

                            <div className={styles['mobile_table--item_row']}>
                                <Typography variant='body2' className='text-secondary'>
                                    تعداد
                                </Typography>
                                <Typography variant='body1' className='text-accent-foreground text-end' weight='bold'>
                                    {orderItem?.quantity}
                                </Typography>
                            </div>

                            <div className={styles['mobile_table--item_row']}>
                                <Typography variant='body2' className='text-secondary'>
                                    وضعیت سفارش
                                </Typography>
                                <Typography variant='body1' className='text-accent-foreground text-end' weight='bold'>
                                    {currentOrderStatus(order?.status)}
                                </Typography>
                            </div>

                            <div className={styles['mobile_table--item_row']}>
                                <Typography variant='body2' className='text-secondary'>
                                    تاریخ سفارش
                                </Typography>
                                <Typography variant='body1' className='text-accent-foreground text-end' weight='bold'>
                                    {new Date(order.createdAt).toLocaleDateString('fa-IR')}
                                </Typography>
                            </div>

                            <div className={styles['mobile_table--item_row']}>
                                <Typography variant='body2' className='text-secondary'>
                                    عملیات
                                </Typography>
                                <div>
                                    {order?.status === 'PENDING' ? (
                                        <Dialog open={openModal} onOpenChange={setOpenModal}>
                                            <DialogTrigger asChild>
                                                <Button variant='destructive' size='sm'>
                                                    لغو سفارش
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>
                                                        <Typography>آیا از لغو این سفارش مطمئن هستید؟</Typography>
                                                    </DialogTitle>
                                                </DialogHeader>
                                                <div className='flex gap-2'>
                                                    <Button variant='destructive' onClick={() => handleCancelOrder(order.id)}>
                                                        بلی
                                                    </Button>
                                                    <Button variant='secondary' onClick={() => setOpenModal(false)}>
                                                        خیر
                                                    </Button>
                                                </div>
                                            </DialogContent>
                                        </Dialog>
                                    ) : (
                                        <Typography variant='body2' className='text-muted-foreground'>
                                            ---
                                        </Typography>
                                    )}
                                </div>
                            </div>
                        </div>
                    )),
                )
            )}

            {orders ? (
                <div className='flex w-full justify-center items-center mt-10 mb-5'>
                    <Pagination currentPage={page} onPageChange={setPage} totalPages={orders?.pagination?.pages || 1} />
                </div>
            ) : null}
        </div>
    );
};
