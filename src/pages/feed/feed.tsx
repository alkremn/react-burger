import React, { useEffect, useState } from 'react';
import styles from './feed.module.css';
import { OrderList } from '../../components/order-list/order-list';
import { FeedSummary } from '../../components/feed-summary/feed-summary';
import { useDispatch, useSelector } from '../../utils/hooks';
import { DONE, getConnectionUrl } from '../../utils/utils';
import {
  getFinishLoadingAction,
  getStartLoadingAction,
} from '../../services/actionCreators/asyncActionCreator';
import {
  getWsConnectionStartAction,
  getWsConnectionStopAction,
} from '../../services/actionCreators/wsActions';

export const FeedPage = () => {
  const dispatch = useDispatch();
  const { orderData } = useSelector(store => store.ws);
  const { isLoading } = useSelector(store => store.async);

  const [total, setTotal] = useState<number>();
  const [totalToday, setTotalToday] = useState<number>();
  const [readyList, setReadyList] = useState<number[]>([]);
  const [inProgressList, setInProgressList] = useState<number[]>([]);

  useEffect(() => {
    dispatch(getStartLoadingAction());
    dispatch(getWsConnectionStartAction(getConnectionUrl()));
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
      {!isLoading && orderData && (
        <>
          <h1 className={`text text_type_main-default ${styles.title}`}>Лента заказов</h1>
          <div className={styles.contentContainer}>
            <OrderList />
            <FeedSummary
              total={total}
              totalToday={totalToday}
              readyList={readyList}
              inProgressList={inProgressList}
            />
          </div>
        </>
      )}
    </section>
  );
};
