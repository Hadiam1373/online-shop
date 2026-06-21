import { HeaderTitle } from '@/components';
import styles from './desktop-table.module.css';
import { useOrders } from '@/app/user-dashboard/orders/orders.model';
import { Skeleton } from '@/components/ui/skeleton';
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { BookOpen } from 'lucide-react';
import { Typography } from '@/components/ui/typography';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Pagination from '@/components/ui/pagination';

export const OrderDesktopTable = () => {
    const { orders, isPending, currentOrderStatus, handleCancelOrder, openModal, setOpenModal, page, setPage } = useOrders();

    return (
        <div className={styles['form_wrapper--table']}>
            {isPending ? (
                <div className='flex w-full flex-col gap-2 p-4'>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div className='flex gap-4' key={index}>
                            <Skeleton className='h-8 flex-1' />
                            <Skeleton className='h-8 w-24' />
                            <Skeleton className='h-8 w-20' />
                        </div>
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
                <table>
                    <thead>
                        <tr>
                            <th>ردیف</th>
                            <th>نام محصول</th>
                            <th>قیمت</th>
                            <th>تعداد</th>
                            <th>وضعیت سفارش</th>
                            <th>تاریخ خرید</th>
                            <th>عملیات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.data?.map((item, index) =>
                            item?.orderItems?.map(order => (
                                <tr key={order.id}>
                                    <td>{index + 1}</td>
                                    <td>{order?.product?.name}</td>
                                    <td>{order.price.toLocaleString()}</td>
                                    <td>{order.quantity}</td>
                                    <td>{currentOrderStatus(item.status)}</td>
                                    <td>{new Date(item.createdAt).toLocaleDateString('fa-IR')}</td>
                                    <td>
                                        {item?.status === 'PENDING' ? (
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
                                                        <Button variant='destructive' onClick={() => handleCancelOrder(item.id)}>
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
                                    </td>
                                </tr>
                            )),
                        )}
                    </tbody>
                </table>
            )}
            <div className='flex w-full justify-center items-center mt-10'>
                <Pagination currentPage={page} onPageChange={setPage} totalPages={orders?.pagination?.pages || 1} />
            </div>
        </div>
    );
};
