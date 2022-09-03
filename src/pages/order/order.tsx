import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './order.module.css';
import { useDispatch, useSelector } from '../../utils/hooks';
import { IOrder } from '../../utils/types';
import { DONE } from '../../utils/utils';
import { IngredientList } from '../../components/ingredient-list/ingredient-list';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
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
      <h3 className={`text ${styles.orderNumber}`}>#{order?.number}</h3>
      <h2 className={`text text_type_main-default ${styles.orderTitle}`}>{order?.name}</h2>
      <span
        className={`text text_type_main-default ${styles.status} ${
          order?.status === DONE ? `${styles.statusReady}` : ''
        }`}
      >
        {order?.status === DONE ? 'Выполнен' : 'Готовится'}
      </span>
      <h3 className={`text text_type_main-default ${styles.listTitle}`}>Состав:</h3>
      <IngredientList ingredientIds={order?.ingredients} />
      <div className={styles.buttomContainer}>
        <p className={`text text_type_main-default ${styles.timeStamp}`}>Вчера, 13:50 i-GMT+3</p>
        <p className={styles.price}>
          <span className={styles.priceDigits}>480</span>
          <CurrencyIcon type='primary' />
        </p>
      </div>
    </div>
  );
};
