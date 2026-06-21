'use client';
import { HeaderTitle } from '@/components';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DesktopTable } from '@/components/ui/table/desktop-table';
import { MobileCardTable } from '@/components/ui/table/mobile-table';
import { Typography } from '@/components/ui/typography';
import styles from '../user-dashboard.module.css';
import { useOrders } from './orders.model';

const Orders = () => {
    const { orders, isPending, currentOrderStatus, handleCancelOrder, openModal, setOpenModal, page, setPage } = useOrders();

    const rows =
        orders?.data.map(order => ({
            id: order.id,
            fields: [
                { label: 'شماره سفارش', value: order.id },
                { label: 'مبلغ', value: order.total },
                { label: 'وضعیت', value: currentOrderStatus(order.status) },
            ],
            actions:
                order?.status === 'PENDING' ? (
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
                ) : null,
        })) ?? [];

    return (
        <div className={styles['form_wrapper']}>
            <HeaderTitle title='سفارشات کاربر' />

            <DesktopTable
                head={['ردیف', 'نام محصول', 'قیمت', 'تعداد', 'وضعیت سفارش', 'تاریخ خرید', 'عملیات']}
                isLoading={isPending}
                isShowEmptyState={!orders?.data?.length}
                body={
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
                }
            />

            <MobileCardTable data={rows} loading={isPending} emptyText='دیتایی برای نمایش موجود نیست' />
        </div>
    );
};
export default Orders;
