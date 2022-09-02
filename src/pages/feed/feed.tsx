import React, { useEffect, useState } from 'react';
import styles from './feed.module.css';
import { OrderList } from '../../components/order-list/order-list';
import { OrderSummary } from '../../components/order-summary/order-summary';
import { getWsConnectionStartAction } from '../../services/actionCreators/wsActions';
import { useDispatch, useSelector } from '../../utils/hooks';

export const FeedPage = () => {
  const dispatch = useDispatch();
  const { orderData } = useSelector(store => store.ws);

  const [total, setTotal] = useState<number>();
  const [totalToday, setTotalToday] = useState<number>();
  const [readyList, setReadyList] = useState<string[]>([]);
  const [inProgressList, setInProgressList] = useState<string[]>([]);

  useEffect(() => {
    dispatch(getWsConnectionStartAction());
  }, [dispatch]);

  useEffect(() => {
    if (orderData) {
      setTotal(orderData.total);
      setTotalToday(orderData.totalToday);

      const readyList: string[] = [];
      const inProgressList: string[] = [];

      orderData.orders.forEach(order => {
        if (order.status === 'done') {
          readyList.push(order._id);
        } else {
          inProgressList.push(order._id);
        }
      });
      setReadyList(readyList);
      setInProgressList(inProgressList);
    }
  }, [orderData]);

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
