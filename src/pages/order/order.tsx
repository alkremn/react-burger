import React from 'react';
import styles from './order.module.css'
import { OrderSummary } from '../../components/order-summary/order-summary';

export const OrderPage = () => {
  return <div className={styles.container}><OrderSummary /></div>;
};
