import React from 'react';
import { OrderList } from '../order-list/order-list';
import styles from './order-history.module.css';
import { feedData } from '../../utils/data';

export const OrderHistory = () => {
  return <OrderList orders={feedData.orders} />;
};
