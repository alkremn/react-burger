import React from 'react';
import { OrderListItem } from '../order-list-item/order-list-item';
import styles from './order-list.module.css';
import { useSelector } from '../../utils/hooks';

export const OrderList = () => {
  const { orderData } = useSelector(store => store.ws);
  return (
    <ul className={styles.orderList}>
      {orderData?.orders.map(order => (
        <OrderListItem
          key={order._id}
          orderId={order._id}
          orderNumber={order.number}
          title={order.name}
          createdAt={order.createdAt}
          ingredientIds={order.ingredients}
        />
      ))}
    </ul>
  );
};
