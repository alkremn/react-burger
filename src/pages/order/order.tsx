import React, { useEffect } from 'react';
import styles from './order.module.css';
import { OrderSummary } from '../../components/order-summary/order-summary';
import { useDispatch, useSelector } from '../../utils/hooks';
import {
  getWsConnectionStartAction,
  getWsConnectionStopAction,
} from '../../services/actionCreators';
import { useHistory, useLocation } from 'react-router-dom';
import {
  getFinishLoadingAction,
  getStartLoadingAction,
} from '../../services/actionCreators/asyncActionCreator';
import { refreshTokenAction } from '../../services/actions';
import { getConnectionUrl, getSecureConnectUrl } from '../../utils/utils';

export const OrderPage = () => {
  const { pathname } = useLocation();
  const { user } = useSelector(store => store.auth);
  const { orderData } = useSelector(store => store.ws);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (pathname.includes('/profile/orders/')) {
      if (!user) {
        history.push('/login');
      }

      dispatch(getStartLoadingAction());
      if (!user?.accessToken) {
        dispatch(refreshTokenAction());
      }
      dispatch(getWsConnectionStartAction(getSecureConnectUrl(user!.accessToken!)));
    } else {
      dispatch(getWsConnectionStartAction(getConnectionUrl()));
    }
    return () => {
      dispatch(getWsConnectionStopAction());
    };
  }, [dispatch, history, user, pathname]);

  useEffect(() => {
    if (orderData) {
      dispatch(getFinishLoadingAction());
    }
  }, [orderData, dispatch]);

  return (
    <div className={styles.container}>
      <OrderSummary />
    </div>
  );
};
