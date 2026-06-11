'use client';
import { HeaderTitle } from '@/components';
import styles from '../user-dashboard.module.css';
import { OrderDesktopTable } from './components';

const Orders = () => {
    return (
        <div className={styles['form_wrapper']}>
            <HeaderTitle title='سفارشات کاربر' />
            <div className='hidden lg:block'>
                <OrderDesktopTable />
            </div>
        </div>
    );
};
export default Orders;
