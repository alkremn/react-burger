import React from 'react';
import styles from './order-summary.module.css';

interface OrderSummaryProps {
  total: number;
  totalToday: number;
}

export const OrderSummary = ({ total, totalToday }: OrderSummaryProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <div className={styles.finished}>
          <h2 className='text text_type_main-medium'>Готовы:</h2>
          <ul className={`${styles.list} ${styles.secondaryColor}`}>
            <li>034533</li>
            <li>034533</li>
            <li>034533</li>
            <li>034533</li>
            <li>034533</li>
            <li>034533</li>
          </ul>
        </div>
        <div>
          <h2 className='text text_type_main-medium'>В работе:</h2>
          <ul className={styles.list}>
            <li>034533</li>
            <li>034533</li>
            <li>034533</li>
            <li>034533</li>
          </ul>
        </div>
      </div>
      <div className={styles.topMargin}>
        <p className='text text_type_main-medium'>Выполнено за все время:</p>
        <span className={styles.digits}>{total}</span>
      </div>
      <div className={styles.topMargin}>
        <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
        <span className={styles.digits}>{totalToday}</span>
      </div>
    </div>
  );
};
