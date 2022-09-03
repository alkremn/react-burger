import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './order.module.css';
import { useDispatch, useSelector } from '../../utils/hooks';
import { IOrder } from '../../utils/types';
import { DONE } from '../../utils/utils';
import {
  getWsConnectionStartAction,
  getWsConnectionStopAction,
} from '../../services/actionCreators/wsActions';

export const OrderPage = () => {
  const { id } = useParams<{ id: string }>();
  const { orderData } = useSelector(store => store.ws);
  const dispatch = useDispatch();
  const [order, setOrder] = useState<IOrder | undefined>(undefined);

  useEffect(() => {
    dispatch(getWsConnectionStartAction());
    return () => {
      dispatch(getWsConnectionStopAction());
    };
  }, [dispatch]);

  useEffect(() => {
    const foundOrder = orderData?.orders.find(order => order._id === id);
    console.log(foundOrder);
    if (foundOrder) {
      setOrder(foundOrder);
    }
  }, [id, orderData]);

  return (
    <div className={styles.container}>
      <h3 className={styles.orderNmber}>#034533{order?.number}</h3>
      <h2 className={`text ${styles.orderTitle}`}>Black Hole Singularity острый бургер</h2>
      <span className={`text ${order?.status === DONE ? 'ready' : ''}`}>
        {order?.status === DONE ? 'Выполнен' : 'Готовится'}
      </span>
      <h3 className={styles.listTitle}>Состав:</h3>
      <ul>{order?.ingredients}</ul>
    </div>
  );
};
