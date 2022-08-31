import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './order.module.css';
import { useSelector } from '../../utils/hooks';
import { IMainStore } from '../../utils/types';

export const OrderPage = () => {
  // const { orders } = useSelector((store: IMainStore) => store.orders);
  const { id } = useParams<{ id: string }>();
  return (
    <div className={styles.container}>
      <h3>#034533</h3>
      <h2>Black Hole Singularity острый бургер</h2>
      <span>Выполнен</span>
      <h3>Состав:</h3>
    </div>
  );
};
