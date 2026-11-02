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
    const { orders, isPending, currentOrderStatus, handleCancelOrder, handleStartPayment, openModal, setOpenModal } = useOrders();

    const rows =
        orders?.data.map(order => ({
            id: order.id,
            fields: [
                { label: 'شماره سفارش', value: order.id },
                { label: 'گیرنده', value: [order.recipientFirstName, order.recipientLastName].filter(Boolean).join(' ') || '---' },
                { label: 'شماره تماس', value: order.recipientPhone || '---' },
                {
                    label: 'نشانی تحویل',
                    value: [order.province, order.city, order.address, order.postalCode].filter(Boolean).join('، ') || '---',
                },
                { label: 'مبلغ', value: order.total },
                { label: 'وضعیت', value: currentOrderStatus(order.status) },
            ],
            actions:
                order?.status === 'PENDING' ? (
                    <div className='flex flex-wrap gap-2'>
                        <Button size='sm' onClick={() => handleStartPayment(order.id)}>
                            پرداخت سفارش
                        </Button>
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
                    </div>
                ) : null,
        })) ?? [];

    return (
        <div className={styles['form_wrapper']}>
            <HeaderTitle title='سفارشات کاربر' />

            <DesktopTable
                head={['ردیف', 'نام محصول', 'قیمت', 'تعداد', 'گیرنده', 'شماره تماس', 'نشانی تحویل', 'وضعیت سفارش', 'تاریخ خرید', 'عملیات']}
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
                                    <td>{[item.recipientFirstName, item.recipientLastName].filter(Boolean).join(' ') || '---'}</td>
                                    <td>{item.recipientPhone || '---'}</td>
                                    <td>{[item.province, item.city, item.address, item.postalCode].filter(Boolean).join('، ') || '---'}</td>
                                    <td>{currentOrderStatus(item.status)}</td>
                                    <td>{new Date(item.createdAt).toLocaleDateString('fa-IR')}</td>
                                    <td>
                                        {item?.status === 'PENDING' ? (
                                            <div className='flex flex-wrap gap-2'>
                                                <Button size='sm' onClick={() => handleStartPayment(item.id)}>
                                                    پرداخت
                                                </Button>
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
                                            </div>
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
