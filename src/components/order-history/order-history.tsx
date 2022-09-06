import React, { useEffect } from 'react';
import {
  getFinishLoadingAction,
  getStartLoadingAction,
  getWsConnectionStopAction,
} from '../../services/actionCreators';
import { useDispatch, useSelector } from '../../utils/hooks';
import { OrderList } from '../order-list/order-list';
import { getWsConnectionStartAction } from '../../services/actionCreators/wsActions';
import { useHistory } from 'react-router-dom';
import { getSecureConnectUrl, INVALID_TOKEN_RESPONSE } from '../../utils/utils';
import { refreshTokenAction } from '../../services/actions/authActions';

export const OrderHistory = () => {
  const { user } = useSelector(store => store.auth);
  const { orderData, errorMessage } = useSelector(store => store.ws);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      history.push('/login');
    }
    dispatch(getStartLoadingAction());
    if (!user!.accessToken) {
      dispatch(refreshTokenAction());
    } else {
      dispatch(getWsConnectionStartAction(getSecureConnectUrl(user!.accessToken)));
    }
    return () => {
      dispatch(getWsConnectionStopAction());
    };
  }, [dispatch, history, user]);

  useEffect(() => {
    if (orderData) {
      dispatch(getFinishLoadingAction());
    }
  }, [orderData, dispatch]);

  useEffect(() => {
    if (errorMessage === INVALID_TOKEN_RESPONSE) {
      dispatch(refreshTokenAction());
    }
  }, [errorMessage, dispatch]);

  return <OrderList />;
};
