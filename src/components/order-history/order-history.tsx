import React, { useEffect } from 'react';
import {
  getStartLoadingAction,
  getWsConnectionStopAction,
  getWsSecureConnectionStartAction,
} from '../../services/actionCreators';
import { useDispatch } from '../../utils/hooks';
import { OrderList } from '../order-list/order-list';

export const OrderHistory = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStartLoadingAction());
    dispatch(getWsSecureConnectionStartAction());
    return () => {
      dispatch(getWsConnectionStopAction());
    };
  }, [dispatch]);

  return <OrderList />;
};
