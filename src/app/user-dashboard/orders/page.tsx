'use client';
import { HeaderTitle } from '@/components';
import styles from '../user-dashboard.module.css';
import { OrderDesktopTable } from './components';
import { OrderMobileTable } from '@/app/user-dashboard/orders/components/mobile-table';

const Orders = () => {
    return (
        <div className={styles['form_wrapper']}>
            <HeaderTitle title='سفارشات کاربر' />
            <div className='hidden md:block'>
                <OrderDesktopTable />
            </div>
            <div className='block md:hidden'>
                <OrderMobileTable />
            </div>
        </div>
    );
};
export default Orders;
