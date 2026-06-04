import { HeaderTitle } from '@/components';
import styles from '../user-dashboard.module.css';

const Orders = () => {
    return (
        <div className={styles['form_wrapper']}>
            <HeaderTitle title='سفارشات کاربر' />
            <div className={styles['form_wrapper--table']}>
                <table>
                    <thead>
                        <tr>
                            <th>ردیف</th>
                            <th>نام محصول</th>
                            <th>قیمت</th>
                            <th>وضعیت سفارش</th>
                            <th>موجودی</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>تست</td>
                            <td>100000</td>
                            <td>موجود</td>
                            <td>فعال</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>تست</td>
                            <td>100000</td>
                            <td>موجود</td>
                            <td>فعال</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default Orders;
