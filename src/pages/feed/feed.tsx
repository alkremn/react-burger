import React, { useEffect, useState } from 'react';
import styles from './feed.module.css';
import { OrderList } from '../../components/order-list/order-list';
import { OrderSummary } from '../../components/order-summary/order-summary';
import {
  getWsConnectionStartAction,
  getWsConnectionStopAction,
} from '../../services/actionCreators/wsActions';
import { useDispatch, useSelector } from '../../utils/hooks';
import { DONE } from '../../utils/utils';
import {
  getFinishLoadingAction,
  getStartLoadingAction,
} from '../../services/actionCreators/asyncActionCreator';

export const FeedPage = () => {
  const dispatch = useDispatch();
  const { orderData } = useSelector(store => store.ws);

  const [total, setTotal] = useState<number>();
  const [totalToday, setTotalToday] = useState<number>();
  const [readyList, setReadyList] = useState<number[]>([]);
  const [inProgressList, setInProgressList] = useState<number[]>([]);

  useEffect(() => {
    dispatch(getStartLoadingAction());
    dispatch(getWsConnectionStartAction());
    return () => {
      dispatch(getWsConnectionStopAction());
    };
  }, [dispatch]);

  useEffect(() => {
    if (orderData) {
      dispatch(getFinishLoadingAction());
      setTotal(orderData.total);
      setTotalToday(orderData.totalToday);

      const readyList: number[] = [];
      const inProgressList: number[] = [];

      orderData.orders.forEach(order => {
        if (order.status === DONE) {
          readyList.push(order.number);
        } else {
          inProgressList.push(order.number);
        }
      });
      setReadyList(readyList);
      setInProgressList(inProgressList);
    }
  }, [orderData, dispatch]);

  return (
    <section className={styles.mainContainer}>
      <h1 className={`text text_type_main-default ${styles.title}`}>Лента заказов</h1>
      <div className={styles.contentContainer}>
        <OrderList />
        <OrderSummary
          total={total}
          totalToday={totalToday}
          readyList={readyList}
          inProgressList={inProgressList}
        />
      </div>
    </section>
  );
};
