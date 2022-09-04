import React, { useEffect } from 'react';
import styles from './order.module.css';
import { OrderSummary } from '../../components/order-summary/order-summary';
import { useDispatch } from '../../utils/hooks';
import {
  getWsConnectionStopAction,
  getWsSecureConnectionStartAction,
} from '../../services/actionCreators';

export const OrderPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWsSecureConnectionStartAction());
    return () => {
      dispatch(getWsConnectionStopAction());
    };
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <OrderSummary />
    </div>
  );
};
