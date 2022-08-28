import React from 'react';
import styles from './feed.module.css';
import { feedData } from '../../utils/data';
import { OrderListItem } from './../../components/order-list-item/order-list-item';

export const FeedPage = () => {
  return (
    <section className={styles.container}>
      <div className={styles.feedListContainer}>
        <h1 className={`text text_type_main-default ${styles.title}`}>Лента заказов</h1>
        <ul className={styles.feedList}>
          {feedData.orders.map(order => (
            <OrderListItem ingredientIds={order.ingredients} />
          ))}
        </ul>
      </div>
      <div className={styles.orderStatistics}></div>
    </section>
  );
};
