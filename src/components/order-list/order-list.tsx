import React from 'react';
import { IOrder } from '../../utils/types';
import { OrderListItem } from '../order-list-item/order-list-item';
import styles from './order-list.module.css';

interface OrderListProps {
  orders: IOrder[];
}

export const OrderList = ({ orders }: OrderListProps) => {
  return (
    <ul className={styles.orderList}>
      {orders.map(order => (
        <OrderListItem key={order._id} orderId={order._id} ingredientIds={order.ingredients} />
      ))}
    </ul>
  );
};
