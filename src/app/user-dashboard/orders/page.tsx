'use client';
import { HeaderTitle } from '@/components';
import styles from '../user-dashboard.module.css';
import { useOrders } from './orders.model';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Typography } from '@/components/ui/typography';

const Orders = () => {
    const { orders, isPending, currentOrderStatus, handleCancelOrder, openModal, setOpenModal, page, setPage } = useOrders();
    return (
        <div className={styles['form_wrapper']}>
            <HeaderTitle title='سفارشات کاربر' />
            <div className={styles['form_wrapper--table']}>
                {isPending ? (
                    <div className='flex w-full  flex-col gap-2'>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div className='flex gap-4' key={index}>
                                <Skeleton className='h-4 flex-1' />
                                <Skeleton className='h-4 w-24' />
                                <Skeleton className='h-4 w-20' />
                            </div>
                        ))}
                    </div>
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
                                                        <Button>لغو سفارش</Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>
                                                                <Typography>آیا از لغو این سفارش مطمئن هستید؟</Typography>
                                                            </DialogTitle>
                                                        </DialogHeader>
                                                        <div className='flex gap-2'>
                                                            <Button variant='secondary' onClick={() => handleCancelOrder(item.id)}>
                                                                بلی
                                                            </Button>
                                                            <Button onClick={() => setOpenModal(false)}>خیر</Button>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                            ) : (
                                                '---'
                                            )}
                                        </td>
                                    </tr>
                                )),
                            )}
                        </tbody>
                    </table>
                )}
                <div className='flex w-full justify-center items-center'></div>
            </div>
        </div>
    );
};
export default Orders;
