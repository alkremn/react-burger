import React from 'react';
import styles from './feed.module.css';
import { feedData } from '../../utils/data';
import { OrderList } from '../../components/order-list/order-list';
import { OrderSummary } from '../../components/order-summary/order-summary';

export const FeedPage = () => {
  return (
    <section className={styles.mainContainer}>
      <h1 className={`text text_type_main-default ${styles.title}`}>Лента заказов</h1>
      <div className={styles.contentContainer}>
        <OrderList orders={feedData.orders} />
        <OrderSummary total={feedData.total} totalToday={feedData.totalToday} />
      </div>
    </section>
  );
};
