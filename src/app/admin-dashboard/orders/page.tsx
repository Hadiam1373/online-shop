'use client';
import { OrderModel, OrderStatusBadge } from '@/app/admin-dashboard/orders/orders.model';
import { HeaderTitle } from '@/components';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { DesktopTable } from '@/components/ui/table/desktop-table';
import { MobileCardTable } from '@/components/ui/table/mobile-table';
import styles from '../admin-dashboard.module.css';

export default function OrdersPage() {
    const { orders, isLoading, changeStatus, rows } = OrderModel();

    return (
        <div className={styles['form_wrapper']}>
            <HeaderTitle title='سفارشات' />

            <DesktopTable
                head={['شماره سفارش', 'مبلغ', 'وضعیت', 'اقدامات']}
                isLoading={isLoading}
                isShowEmptyState={!orders?.data.length}
                body={
                    <tbody>
                        {orders?.data.map(o => (
                            <tr key={o.id} className='border-t border-border'>
                                <td className='py-2'>{o.id}</td>
                                <td className='py-2'>{o.total}</td>
                                <td className='py-2'>
                                    <OrderStatusBadge status={o.status} />
                                </td>
                                <td className='py-2'>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant='outline' size='sm'>
                                                عملیات
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem onClick={() => changeStatus(o.id, 'SHIPPED')}>ارسال </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => changeStatus(o.id, 'PAID')}>پرداخت </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => changeStatus(o.id, 'PENDING')}>
                                                    در انتظار پرداخت{' '}
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => changeStatus(o.id, 'DELIVERED')}>
                                                    تحویل داده شده
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => changeStatus(o.id, 'CANCELLED')}>لغو</DropdownMenuItem>
                                            </DropdownMenuGroup>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                }
            />

            <MobileCardTable data={rows} loading={isLoading} emptyText='سفارشی موجود نیست' />
        </div>
    );
}
