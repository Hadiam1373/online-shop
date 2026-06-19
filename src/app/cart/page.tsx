'use client';

import { useCart } from '@/app/cart/cart.model';
import styles from './cart.module.css';

const Cart = () => {
    const { cartData } = useCart();
    return <div className={styles.cart}>Cart</div>;
};
export default Cart;
